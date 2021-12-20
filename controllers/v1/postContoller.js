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
    message: 'This route is not yet defined',
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
});

exports.getFollowedPosts = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  let imageUrl, imagePublicId;
  if (req.body.image) {
    const { createReadStream } = await req.body.image;
    const stream = createReadStream();
    const uploadImage = await uploadToCloudinary(stream, 'post');

    if (!uploadImage.secure_url) {
      res.status(500).json({
        status: 'error',
        message: 'Something went erong while uploading image to Cloudinary',
      });
    }

    imageUrl = uploadImage.secure_url;
    imagePublicId = uploadImage.public_id;
  }

  const newPost = await Post.create({
    title: req.body.title,
    image: imageUrl,
    imagePublicId,
    author: req.body.authorId,
  });

  await User.findOneAndUpdate(
    { _id: req.body.authorId },
    { $push: { posts: newPost._id } }
  );

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  if (req.body.imagePublicId) {
    const deleteImage = await deleteFromCloudinary(req.body.imagePublicId);

    if (deleteImage.result !== 'ok') {
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong while deleting image from Cloudinary',
      });
    }

    const post = await Post.findByIdAndRemove(req.params.id);

    await User.findOneAndUpdate(
      { _id: post.author },
      { $pull: { posts: post._id } }
    );

    await Like.find({ post: post._id }).deleteMany();

    post.likes.map(async (likeId) => {
      await User.where({ likes: likeId }).updateMany({
        $pull: { likes: likeId },
      });
    });

    await Comment.find({ post: post._id }).deleteMany();

    post.comments.map(async (commentId) => {
      await User.where({ comments: commentId }).updateMany({
        $pull: { comments: commentId },
      });
    });

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  }
});
