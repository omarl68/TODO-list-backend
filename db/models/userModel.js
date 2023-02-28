const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
0;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'must be have a name'],
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    trim: true,
    unique: [true, 'must be have unique email'],
    required: [true, 'must be have a email'],
    lowercase: true,
    validator: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['admin', 'user', 'rh', 'team-leader'],
    default: 'user',
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, 'must have a password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'must have a passwordConfirm'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordREsetExpires: Date,
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now()-1000 ;
  next();
});

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordresetToken = function () {
  const salt = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(salt)
    .digest('hex');
  this.passwordREsetExpires = Date.now() + 10 * 60 * 1000;
  return this.passwordResetToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
