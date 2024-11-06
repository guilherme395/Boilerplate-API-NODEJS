const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController.js");

router.get("/users", UserController.getAllUsers);
router.get("/user/:id", UserController.getUserById);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;