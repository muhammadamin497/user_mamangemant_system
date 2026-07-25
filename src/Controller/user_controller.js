const User = require("../model/usermodle");

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;
console.log("Search:", req.query.search);
    

    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Users with Search + Filtering + Sorting + Pagination
const getUsers = async (req, res) => {
  try {
    // =========================
    // 1. Get Query Parameters
    // =========================

    const search = req.query.search || "";
    const role = req.query.role || "";
    const status = req.query.status || "";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const sort = req.query.sort || "newest";


    // =========================
    // 2. Calculate Skip
    // =========================

    const skip = (page - 1) * limit;


    // =========================
    // 3. Create Filter Query
    // =========================

    const filterQuery = {};


    // =========================
    // 4. Search
    // =========================

    if (search) {
      filterQuery.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }


    // =========================
    // 5. Role Filter
    // =========================

    if (role) {
      filterQuery.role = role;
    }


    // =========================
    // 6. Status Filter
    // =========================

    if (status) {
      filterQuery.status = status;
    }


    // =========================
    // 7. Sorting
    // =========================

    let sortQuery = {};

    if (sort === "newest") {
      sortQuery = { createdAt: -1 };
    }

    if (sort === "oldest") {
      sortQuery = { createdAt: 1 };
    }

    if (sort === "name-asc") {
      sortQuery = { name: 1 };
    }

    if (sort === "name-desc") {
      sortQuery = { name: -1 };
    }


    // =========================
    // 8. Get Users
    // =========================

    const users = await User.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);


    // =========================
    // 9. Count Users
    // =========================

    const totalUsers = await User.countDocuments(filterQuery);


    // =========================
    // 10. Calculate Total Pages
    // =========================

    const totalPages = Math.ceil(totalUsers / limit);


    // =========================
    // 11. Response
    // =========================

    res.status(200).json({
      success: true,

      filters: {
        search,
        role,
        status
      },

      sort,

      pagination: {
        currentPage: page,
        limit,
        totalUsers,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      },

      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}; 


// Get Single User
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update User
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update User Status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Last Login
const updateLastLogin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { lastLogin: new Date() },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Last login updated",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateStatus,
  updateLastLogin,
};
