import { Router } from "express";
import { upload } from "../../util/s3-spaces";

import {
  getUserProfile,
  updateUserProfile,
  updateProfilePicture,
  changeUserPassword,
  deleteUser,
  updatePublicUrl,
  addLanguage,
  deleteLanguage,
  getDashboardDetails,
} from "./user.controllers";


const router = Router();

router
  .route("/")
  .get(getUserProfile)
  .put(upload.single("bannerImage"), updateUserProfile)
  .delete(deleteUser);

router.route("/profile").put(upload.single("picture"), updateProfilePicture);

router.route("/profile/username").put(updatePublicUrl);
router.route("/languages/").post(addLanguage);

router.route("/languages/:id").delete(deleteLanguage);

router.route("/password").post(changeUserPassword);

router.get("/details", getDashboardDetails);

export default router;
