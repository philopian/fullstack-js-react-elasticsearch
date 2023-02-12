const config = {
  moduleFileExtensions: ['js'],
  testMatch: ['test/**/*.test.js'],

  roots: ['<rootDir>'],
  testMatch: ['**/*.test.js', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
  moduleFileExtensions: ['js', 'json'],
}
export default config
