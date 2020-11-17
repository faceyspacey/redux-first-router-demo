module.exports.health = async (ctx, next) => {
    ctx.body = 'alive';

    await next();
}
