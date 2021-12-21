const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'You cannot submit an empty comment'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Comment', commentSchema);
