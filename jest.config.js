const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: compilerOptions.paths
    ? pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      })
    : {},
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [5098],
        },
        tsconfig: {
          ...compilerOptions,
          module: 'nodenext',
          moduleResolution: 'nodenext',
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!@faker-js/faker/)'],
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
};
