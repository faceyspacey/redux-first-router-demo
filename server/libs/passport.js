const {KoaPassport} = require('koa-passport');
const passport = new KoaPassport();

const localStrategy = require('./strategies/local');

passport.use(localStrategy);

module.exports = passport;
