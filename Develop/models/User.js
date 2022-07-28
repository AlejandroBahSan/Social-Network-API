const { Schema, model } = require('mongoose');


// (( Email validation RegEx ))
const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};


// (( User Schema ))
const userSchema = new Schema({
      username: {
        type: String,
        unique: true,
        required: 'Username is require, only alphanumeric characters are accepted',
        trim: true,
        match: [ 
          /^[\w+]{6,8}$/, 'Please fill a valid username'
      ]
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
      }
      ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

// virtual to count friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
