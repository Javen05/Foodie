const express = require("express");
const router = express.Router();

var accountController = require("../controllers/accountController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(["/me"], authMiddleware);

router.post("/register", accountController.addAccount);
router.post("/login",    accountController.login);

router.get("/me",        accountController.viewAccount);
router.put("/me",        accountController.updateAccount);
router.delete("/me",     accountController.deleteAccount);
router.put("/me/upload", accountController.editProfilePicture);

router.get("/count", accountController.userCount);

module.exports = router;