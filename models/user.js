require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Mithrandir',
    minLength: [2, 'needs at least 2 letters'],
    maxLength: [30, 'cannot be longer than 30 letters'],
    required: true,
  },
  email: {
    type: String,
    unique: [true, 'This email has already been used'],
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [8, 'needs at least 8 characters'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('bad credentials'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('bad cred'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
