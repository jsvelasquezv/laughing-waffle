module.exports = {
  port: process.env.PORT || 3000,
  mongo: {
    user: 'sebastian',
    password: 'sebastian1',
    host: 'ds155634.mlab.com',
    port: '55634',
    db: 'evercheck-test-9',
    uri: 'mongodb://sebastian:sebastian1@ds155634.mlab.com:55634/evercheck-test-9',
  }
};