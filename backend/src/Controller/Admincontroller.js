const User=require("../model/usermodle")


const dashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const activeUsers = await User.countDocuments({
            status: "active"
        });

        const adminUsers = await User.countDocuments({
            role: "admin"
        });

        const normalUsers = await User.countDocuments({
            role: "user"
        });


        res.json({
            success: true,
            dashboard: {
                totalUsers,
                activeUsers,
                adminUsers,
                normalUsers
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateUserRole = async (req, res) => {
    try {

        const { role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        user.role = role;

        await user.save();


        res.json({
            success: true,
            message: "User role updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports={updateUserRole,dashboard}