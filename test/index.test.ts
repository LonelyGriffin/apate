// Check types exports
import type {IApateConfig} from '../lib'

import {Apate} from '../lib'
import pactum from 'pactum'
import {TEST_APATE_CONFIG} from './apate-config'
import {controlServerUrl, mockServerUrl} from '../src/utils'

describe('General tests', () => {
  test('There are exported all entities', () => {
    expect(Apate).toBeTruthy()
  })

  test('Check the control server running and shutdown', async () => {
    const apate = new Apate(TEST_APATE_CONFIG)
    const healthUrl = controlServerUrl(TEST_APATE_CONFIG, 'health')

    await apate.run()
    await pactum.spec().get(healthUrl).expectStatus(200).expectBody('OK')

    await apate.shutdown()
    await pactum
      .spec()
      .get(healthUrl)
      .expect(({res}) => {
        expect((res as any).code).toBe('ECONNREFUSED')
      })
  })
  test('Base http mock case', async () => {
    const apate = new Apate(TEST_APATE_CONFIG)
    const expectedResponseBody = 'OK'

    await apate.run()

    await apate
      .mockHttp()
      .match('method-exact', 'GET')
      .andMatch('path-exact', '/test')
      .resolveWith((req, res, expectedResponseBody) => res.send(expectedResponseBody), expectedResponseBody)
      .commit()

    await pactum.spec().get(mockServerUrl(TEST_APATE_CONFIG, 'test')).expectBody(expectedResponseBody)

    await apate.shutdown()
  })
  test('Check method exact interceptor only', async () => {
    const apate = new Apate(TEST_APATE_CONFIG)
    const expectedResponseBody = 'OK'

    await apate.run()

    await apate
      .mockHttp()
      .match('method-exact', 'GET')
      .resolveWith((req, res, expectedResponseBody) => res.send(expectedResponseBody), expectedResponseBody)
      .commit()

    await pactum.spec().get(mockServerUrl(TEST_APATE_CONFIG, 'test')).expectBody(expectedResponseBody)

    await apate.shutdown()
  })
  test('Custom matcher', async () => {
    const apate = new Apate(TEST_APATE_CONFIG)
    const expectedResponseBody = 'OK'

    await apate.run()

    await apate
      .mockHttp()
      .match('custom', (request, context) => context.result, {result: true})
      .resolveWith((req, res, expectedResponseBody) => res.send(expectedResponseBody), expectedResponseBody)
      .commit()

    await pactum.spec().get(mockServerUrl(TEST_APATE_CONFIG, 'test')).expectBody(expectedResponseBody)

    await apate.shutdown()
  })
  it('Separation by scope prototype', async () => {
    const expectedForFirstRequest = 'expected-request-body-for-first-request'
    const expectedForSecondRequest = 'expected-request-body-for-second-request'
    const apate = new Apate(TEST_APATE_CONFIG)

    await apate.run()

    await apate
      .mockHttp('first-scope')
      .match('method-exact', 'GET')
      .resolveWith((req, res, expectedResponseBody) => res.send(expectedResponseBody), expectedForFirstRequest)
      .commit()

    await apate
      .mockHttp('second-scope')
      .match('method-exact', 'GET')
      .resolveWith((req, res, expectedResponseBody) => res.send(expectedResponseBody), expectedForSecondRequest)
      .commit()

    // make request for second in order interceptor firstly
    // to check how scope separation work

    await pactum
      .spec()
      .get(mockServerUrl(TEST_APATE_CONFIG, 'test'))
      .withQueryParams('apate-scope', 'second-scope')
      .expectBody(expectedForSecondRequest)

    await pactum
      .spec()
      .get(mockServerUrl(TEST_APATE_CONFIG, 'test'))
      .withQueryParams('apate-scope', 'first-scope')
      .expectBody(expectedForFirstRequest)

    await apate.shutdown()
  })

  it('proxy with captured interceptors prototype', async () => {
    const expected = 'OK'
    const apateForOriginal = new Apate({
      controlPort: 8400,
      mockHost: TEST_APATE_CONFIG.originalHost,
      mockPort: TEST_APATE_CONFIG.originalPort
    })
    const apate = new Apate(TEST_APATE_CONFIG)
    await apateForOriginal.run()
    await apate.run()

    await apateForOriginal
      .mockHttp()
      .match('path-exact', '/test')
      .resolveWith((_, res, data) => res.send(data), expected)
      .commit()

    await apate.startHttpProxy()

    await pactum.spec().get(mockServerUrl(TEST_APATE_CONFIG, 'test')).expectBody(expected)
    const capturedInterceptors = await apate.capturedHttpRequestsAsInterceptors()
    await apate.stopHttpProxy()
    await apate.client.queueHttpInterceptors(...capturedInterceptors)

    await apateForOriginal.shutdown()
    await pactum.spec().get(mockServerUrl(TEST_APATE_CONFIG, 'test')).expectBody(expected)
    await apate.shutdown()
  })
})
