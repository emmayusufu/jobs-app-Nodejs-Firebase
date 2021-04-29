// noinspection DuplicatedCode

const { UserModal } = require("../../models");
const { userRoles } = require("../../utilities/constants");
const ImageStorage = require("../../utilities/image_storage");

exports.setupWorkManProfile = async (req,res) => {
  const {
    userId,
    firstName,
    lastName,
    regionOfOperation,
    dob,
    qualification,
    specialities,
    nin,
    profession,
    aboutSelf,
    startingFee,
  } = req.body;

  const profileImage = req.files.find((e) => e.fieldname === "profileImage");
  const idFrontImage = req.files.find((e) => e.fieldname === "idFrontImage");
  const idBackImage = req.files.find((e) => e.fieldname === "idBackImage");


  const profileImageUploader = new ImageStorage(profileImage);
  const idFrontImageUploader = new ImageStorage(idFrontImage);
  const idBackImageUploader = new ImageStorage(idBackImage);

  UserModal.findOneAndUpdate(
    { _id: userId },
    {
      firstName,
      lastName,
      regionOfOperation,
      dob,
      qualification,
      specialities,
      nin,
      profession,
      aboutSelf,
      startingFee,
      profileImage: await profileImageUploader.uploadImage(),
      idFrontImage: await idFrontImageUploader.uploadImage(),
      idBackImage: await idBackImageUploader.uploadImage(),
      role: userRoles.workman,
      rating:0
    },
    { new: true, useFindAndModify: false },
    function (err, user) {
      if (err) console.log(err);
      res.json({
        message: "success",
        user: user,
      });
    }
  );
};
