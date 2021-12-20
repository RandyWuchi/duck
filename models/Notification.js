const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    post: mongoose.Schema.Types.ObjectId,
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like',
    },
    follow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Follow',
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
