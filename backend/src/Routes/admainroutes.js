const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authmiddelware");
const roleMiddleware = require("../Middleware/rolemiddelware");
const {dashboard,updateUserRole} = require("../Controller/Admincontroller");
const {getUsers,deleteUser, updateStatus} = require("../Controller/user_controller");

// dashbaord all routes

router.get( "/dashboard",authMiddleware,roleMiddleware("admin"), dashboard);


// Admin: Get all users
router.get("/users",authMiddleware, roleMiddleware("admin"),getUsers);


// Admin: Update user role  ← yahan add karein
router.patch( "/users/:id/role",authMiddleware,roleMiddleware("admin"),updateUserRole
);


// Admin: Delete user
router.delete("/users/:id", authMiddleware, roleMiddleware("admin"),deleteUser);


// Admin: Update user status
router.patch("/users/:id/status",authMiddleware,roleMiddleware("admin"),updateStatus
);


module.exports = router;
