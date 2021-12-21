const catchAsync = require('./../../utils/catchAsync');
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require('./../../utils/cloudinary');
const factory = require('./handlerFactory');
const AppError = require('./../../utils/appError');
const Post = require('./../../models/v1/postModel');

exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post);

exports.getFollowedPosts = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been implemented yet',
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  let imageUrl, imagePublicId;
  if (req.body.image) {
    const { createReadStream } = await req.body.image;
    const stream = createReadStream();
    const uploadImage = await uploadToCloudinary(stream, 'post');

    if (!uploadImage.secure_url) {
      next(
        new AppError(
          'Something went wrong while uploading image to Cloudinary',
          500
        )
      );
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
    message: 'This route has not been implemented yet',
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  if (req.body.imagePublicId) {
    const deleteImage = await deleteFromCloudinary(req.body.imagePublicId);

    if (deleteImage.result !== 'ok') {
      next(
        new AppError(
          'Something went wrong while deleting your image from Cloudinary',
          500
        )
      );
    }
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
