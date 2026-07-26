const User=require("../model/usermodle")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


//  login logic here  

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const newuser = await User.findOne({ email });
    

        if (!newuser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, newuser.password);
        
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }
     
       
        const token = jwt.sign(
       {
           id: newuser.id,
           email:newuser.email,
           role:newuser.role

       },
       process.env.JWT_SECRET,
       {expiresIn:'365d'}
        );
        console.log();
        

        res.json({
            message: "Login successful",
            token,
            user:{id:newuser.id,name:newuser.name,email:newuser.email,role:newuser.role}
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};      

//==============
// logout logic here 
//==============

exports.logout = async (req, res) => {
    res.json({
        message: "Logout successful"
    });
};