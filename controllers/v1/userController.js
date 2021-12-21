const catchAsync = require('./../../utils/catchAsync');
const factory = require('./handlerFactory');
const User = require('./../../models/v1/userModel');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
