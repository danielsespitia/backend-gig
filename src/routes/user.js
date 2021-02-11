const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");
const userProfilePicture = require("../utils/cloudinaryPresets/userProfilePicture");

router.route("/sign-up").post(userController.signup);
router.route("/sign-in").post(userController.signin);
router.route("/").get(userController.list);
router.route("/profile").get(auth, userController.show);
router.route("/").put(auth, userController.update);
router
  .route("/update-pp")
  .put(auth, userProfilePicture, userController.updateProfilePicture);
router.route("/").delete(auth, userController.destroy);
router.route("/messages").get(auth, userController.showReceivedMessages);

module.exports = router;