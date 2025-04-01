// This file is used to configure Lighthouse CI
// spcify all the urls to be tested in the collect section
// get the build dir - dist
// using recommended for assertions
// uploades to temporary public storage where the report will be available
module.exports = {
    ci: {
      collect: {
        numberOfRuns: 1,
        staticDistDir: './dist',
        url : [
            'http://localhost/splash',
            'http://localhost/auth',
            'http://localhost/userType',
            'http://localhost/table',
            'http://localhost/submission',
            'http://localhost/accounts',
            'http://localhost/alphabet',
            'http://localhost/articles',
        ],
    },
      upload: {
        target: 'temporary-public-storage',
      },
    },
    assert: {
      preset: 'lighthouse:recommended'
    },
  };