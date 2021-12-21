const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 140,
    },
    image: String,
    imagePublicId: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIRTUAL POPULATE
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'post',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs on .create() and .save()

// QUERY MIDDLEWARE

// AGGREGATION MIDDLEWARE

module.exports = mongoose.model('Post', postSchema);
