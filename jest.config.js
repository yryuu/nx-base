const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/client',
    '<rootDir>/apps/api',
    '<rootDir>/apps/ws',
    '<rootDir>/apps/cordova',
  ],
};
