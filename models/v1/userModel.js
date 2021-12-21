const crypto = require('crypto');

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please tell us your full name'],
      minlength: 4,
      maxlength: 40,
    },
    email: {
      type: String,
      required: [true, 'Please give us your email'],
      lowercase: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    username: {
      type: String,
      required: [true, 'Please give us a username'],
      lowercase: true,
      trim: true,
      unique: true,
      minlength: 1,
      maxlength: 20,
      match: [
        /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
        'Please give us a valid username',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide us with a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password for us'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password do not match, please check again',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
    image: String,
    imagePublicId: String,
    coverImage: String,
    coverImagePublicId: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIRTUAL POPULATE
userSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'author',
  localField: '_id',
});

userSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'author',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs on .create() and .save()
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

// HELPER METHODS
userSchema.methods.isValidPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
