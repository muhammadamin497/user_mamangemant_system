const express = require("express");

const router = express.Router();
const authMiddleware=require("../Middleware/authmiddelware")

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateStatus,
  updateLastLogin,
} = require("../Controller/user_controller");



// Protected profile route
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "User profile",
        user: req.user
    });
});


// Create User
router.post("/", createUser);

// Get All Users
router.get("/", getUsers);

// Get Single User
router.get("/:id", getUserById);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

// Update User Status
router.patch("/:id/status", updateStatus);

// Update Last Login
router.patch("/:id/last-login", updateLastLogin);


module.exports = router;
