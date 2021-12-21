const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Like', likeSchema);
