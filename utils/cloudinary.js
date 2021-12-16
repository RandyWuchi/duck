const cloudinary = require('cloudinary');
const { v4: uuid } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (stream, folder, imagePublicId) => {
  // id imagePulicId is presented we should overwrite the image
  const options = imagePublicId
    ? { public_id: imagePublicId, overwrite: true }
    : { public_id: `${folder}/${uuid()}` };

  return new Promise((resolve, reject) => {
    const streamLoad = cloudinary.v2.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    stream.pipe(streamLoad);
  });
};

const deleteFromCloudinary = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
