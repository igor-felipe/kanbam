"use strict";

const jestConfig = require("./jest.config");

module.exports = {
  ...jestConfig,
  testMatch: ["**/?(*.)+(integ.test).[tj]s?(x)"],
};
