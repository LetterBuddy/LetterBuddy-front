// This file is used to configure Lighthouse CI
// spcify all the urls to be tested in the collect section
// get the build dir - dist
// using recommended for assertions
// uploades to temporary public storage where the report will be available
module.exports = {
    ci: {
      collect: {
        numberOfRuns: 1,
        staticDistDir: dist,
        url : [
            'http://localhost:3000/splash',
            'http://localhost:3000/auth',
            'http://localhost:3000/userType',
            'http://localhost:3000/table',
            'http://localhost:3000/submission',
            'http://localhost:3000/accounts',
            'http://localhost:3000/alphabet',
            'http://localhost:3000/articles',
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