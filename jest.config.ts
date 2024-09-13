export default {
  transform: {
    '^.+\\.ts?$': 'esbuild-jest',
  },
  clearMocks: true,
  testEnvironment: 'node',
  verbose: true
};
