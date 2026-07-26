const express = require("express");
const router = express.Router();
const validateRegister = require("../Middleware/validateRegister");
const validatelogin=require("../Middleware/validateLogin")

const {
    register,
    login,
    logout
} = require("../Controller/auth_controller")


router.post("/register",validateRegister, register);
router.post("/login",validatelogin,login);
router.post("/logout", logout);


module.exports = router;
