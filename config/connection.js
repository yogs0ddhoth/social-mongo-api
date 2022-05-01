const { connect, connection } = require('mongoose');

const connecrionString = 
  process.eventNames.MONGODB_URI || 'mongodb://localhost:27017/socialMongoDB';

module.exports = connect(connecrionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});