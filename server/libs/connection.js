const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const config = require('../config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.set('debug', false);

mongoose.plugin(beautifyUnique);

const connection = mongoose.createConnection(config.mongodb.uri);

connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('open', function () {
  console.log(__filename, "we're connected!");
});

module.exports = connection;
