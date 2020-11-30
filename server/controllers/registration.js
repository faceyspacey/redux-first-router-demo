// const {v4: uuid} = require('uuid');
const User = require('../models/User');

module.exports.register = async (ctx, next) => {
  // const verificationToken = uuid();
  const user = new User({
    email: ctx.request.body.email,
    displayName: ctx.request.body.displayName,
  });

  await user.setPassword(ctx.request.body.password);
  await user.save();

  ctx.body = {status: 'ok'};
};
