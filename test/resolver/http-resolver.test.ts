import {HttpResolver} from '../../src/resolver/http-resolver'
import {createRequestStub, createResponseStub} from '../utils'

describe('resolver', () => {
  describe('http-resolver', () => {
    it('Check resolving with serialization', () => {
      const context = true
      const req = createRequestStub({})
      const res = createResponseStub({send: jest.fn()})
      const resolver = new HttpResolver((req, res, context) => {
        res.send(context)
        return res
      }, context)

      const resolverAfterSerialization = HttpResolver.deserialize(resolver.serialize())

      const actual = resolverAfterSerialization.resolve(req, res)

      expect(actual.send).toBeCalledWith(context)
    })
  })
})
