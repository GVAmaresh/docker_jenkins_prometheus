import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/tests/**/*.test.ts"], 
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

export default config;
