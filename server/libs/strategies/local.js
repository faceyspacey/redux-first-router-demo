const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
  {usernameField: 'email', session: false},
  async function (email, password, done) {
    try {
      const user = await User.findOne({email});

      if (!user) {
        return done(null, false, 'Нет такого пользователя');
      }

      const isValidPassword = await user.checkPassword(password);

      if (!isValidPassword) {
        return done(null, false, 'Невереный пароль');
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
);
