const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
 {
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // TODO: add getter for date
 },
 {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

module.exports = reactionSchema;