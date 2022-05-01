// connection for testing model
const connection = require('../config/connection');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // match: // insert email regex 
                // try: /^([\w\.-]+)@([a-zA-Z0-9\.-]+)\.([a-z\.]{2,6})/
    },
    // thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  }
);

// Model Test:
const testUsers = [
  {username: 'A1', email: 'A2',},
  {username: 'B1', email: 'B2',},
  {username: 'C1', email: 'C2',},
  {username: 'D1', email: 'D2',},
  {username: 'E1', email: 'E2',}
]

connection.on('error', (err) => err);

connection.once('open', async () => {
  try {
    // // Drop existing collection
    // await User.deleteMany({});
    // console.log('Users dropped');

    // // Seed collection
    // await User.collection.insertMany(testUsers);
    // console.log('Users seeded');

    // // populate single collection
    // await User.findOneAndUpdate(
    //   { _id: '626ed479018a61ee21a27e06'},
    //   { $addToSet: { friends: '626ed479018a61ee21a27e07'}},
    //   { new: true }
    // );
    // console.log('friends updated');
  } catch (err) {
    console.log(err);
  };
  process.exit(0);
});

// 
userSchema
  .virtual('friendCount').get(function () {
    return this.friends.length;
  })

const User = model('User', userSchema);

module.exports = User;