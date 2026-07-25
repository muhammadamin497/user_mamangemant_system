const  validateRegister=(req,res,next)=>{
    const {name,email,password}=req.body;

    // name is requierd
    if(!name){
        return res.status(400).json({
              success: false,
            message: "Name is required"
        })
    }

    // email is required
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

      // 3. Password required
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }


    // 4. Name minimum length
    if (name.length < 3) {
        return res.status(400).json({
            success: false,
            message: "Name must be at least 3 characters"
        });
    }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        });
    }

    // 6. Password minimum length
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    // everything is valid
    next()
}
module.exports=validateRegister