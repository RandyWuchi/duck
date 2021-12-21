const catchAsync = require('./../../utils/catchAsync');
const factory = require('./handlerFactory');
const User = require('./../../models/v1/userModel');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message:
      'This route is not defined and will never be defined! Please use /signup',
  });
});
