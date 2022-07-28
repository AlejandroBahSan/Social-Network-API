const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

// (( Reaction Schema ))

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
  }, 
  createdAt: {
    type: Date, 
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
},
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  });

// // (( Though Schema ))

const thoughtSchema = new Schema({
  thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
      type: String,
      required: true,
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});


// Create a virtual called reactionCount that retrieves the length of the thought's 
// reactions array field on query.

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
