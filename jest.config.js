'use strict'

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ["jest-extended/all"],
};
