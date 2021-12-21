const catchAsync = require('./../../utils/catchAsync');
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require('./../../utils/cloudinary');

const User = require('./../../models/v1/userModel');
const Like = require('./../../models/v1/likeModel');
const Comment = require('./../../models/v1/commentModel');
const Follow = require('./../../models/v1/followModel');
const Post = require('./../../models/v1/postModel');
const Notification = require('./../../models/v1/notificationModel');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
});

exports.getFollowedPosts = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
});
