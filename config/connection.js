const { connect, connection } = require('mongoose');

const connectionString = 
  process.eventNames.MONGODB_URI || 'mongodb://localhost:27017/socialMongoDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
