import {HttpPathExactMatcher} from './http-matcher'
import {OrMatcher, AndMatcher} from './logical-matcher'
import {createRequestStub} from '../../test/utils'

describe('matcher', () => {
  describe('logical-matcher', () => {
    describe('OrMatcher', () => {
      it('Check the Or logic between two sub matchers, should be false', () => {
        testOrMatcherWithPathExact('/some/path/one', '/some/path/two', 'some/another/path', false)
      })
      it('Check the Or logic between two sub matchers, should be matched with first', () => {
        testOrMatcherWithPathExact('/some/path/one', '/some/path/two', '/some/path/one', true)
      })
      it('Check the Or logic between two sub matchers, should be matched with second', () => {
        testOrMatcherWithPathExact('/some/path/one', '/some/path/two', '/some/path/two', true)
      })
    })
    describe('OrMatcher', () => {
      it('Check the And logic between two sub matchers, should not be matched with first', () => {
        testAndMatcherWithPathExact('/some/path/one', '/some/path/two', 'some/another/two', false)
      })
      it('Check the And logic between two sub matchers, should not be matched with second', () => {
        testAndMatcherWithPathExact('/some/path/one', '/some/path/two', '/some/path/one', false)
      })
      it('Check the And logic between two sub matchers, should be true', () => {
        testAndMatcherWithPathExact('/some/path', '/some/path', '/some/path', true)
      })
    })
  })
})

const testOrMatcherWithPathExact = (firstPath: string, secondPath: string, pathToMatch: string, expected: boolean) => {
  const firstSubMatcher = new HttpPathExactMatcher(firstPath)
  const secondSubMatcher = new HttpPathExactMatcher(secondPath)
  const orMatcher = new OrMatcher([firstSubMatcher, secondSubMatcher])
  const orMatcherAfterSerialization = OrMatcher.deserialize(orMatcher.serialize())
  const request = createRequestStub({path: pathToMatch})

  const actual = orMatcherAfterSerialization.match(request)

  expect(actual).toBe(expected)
}

const testAndMatcherWithPathExact = (firstPath: string, secondPath: string, pathToMatch: string, expected: boolean) => {
  const firstSubMatcher = new HttpPathExactMatcher(firstPath)
  const secondSubMatcher = new HttpPathExactMatcher(secondPath)
  const andMatcher = new AndMatcher([firstSubMatcher, secondSubMatcher])
  const andMatcherAfterSerialization = AndMatcher.deserialize(andMatcher.serialize())
  const request = createRequestStub({path: pathToMatch})

  const actual = andMatcherAfterSerialization.match(request)

  expect(actual).toBe(expected)
}
