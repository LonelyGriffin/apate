const {Apate} = require('./lib')

module.exports = {
  rootDir: 'test',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
