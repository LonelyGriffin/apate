// Check types exports
import type {IApateConfig} from '../lib'

import {Apate} from '../lib'
import pactum from 'pactum'
import {TEST_APATE_CONFIG} from './apate-config'
import {controlServerUrl, mockServerUrl} from './utils'

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
  test('Check the mock server running and shutdown', async () => {
    const apate = new Apate(TEST_APATE_CONFIG)
    const healthUrl = mockServerUrl(TEST_APATE_CONFIG, 'health')

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
})
