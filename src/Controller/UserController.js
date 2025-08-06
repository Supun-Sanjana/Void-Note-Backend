import DB from "../db/db.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
export const userRegister = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password

    } = req.body;

    // Validate required fields
    if (
      !first_name ||
      !last_name ||
      !username ||
      !email ||
      !password

    ) {
      return res.status(400).json({
        message: "Some fields are missing...",
      });
    }

    // Check for existing user
    const existingUser = await DB.User.findFirst({
      where: {
        OR: [{ Username: username }, { Email: email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or Email already exists.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await DB.User.create({
      data: {
        First_Name: first_name,
        Last_Name: last_name,
        Username: username,
        Email: email,
        Password: hashedPassword,


      },
    });

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser.User_Id,
        username: newUser.Username,
        email: newUser.Email,
      },
    });
    console.log("Received body:", req.body);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//login
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Some fields are missing...",
      });
    }

    const user = await DB.User.findFirst({
      where: { Username: username },
    });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found !",
      });
    }



    const is_match = await bcrypt.compare(password, user.Password);

    if (!is_match) {
      return res.status(401).json({
        message: "Password is wrong !",
      });
    }

    const token = jwt.sign(
      {
        id: user.User_Id,
        user_name: user.Username,
      },
      process.env.JWT_SECRET ||
      "wjb437nhgvbcgx2bjucbngjxh32bvhxjngvhdwj6nbxwvdx45562vghbxbfw45cfghxfcgsxs",
      { expiresIn: "24h" }
    );

    console.log("Received body:", req.body, token);

    return res.status(200).json({ message: "Success", token });

  } catch (e) {
    res.status(500).json({ message: "try againg ", error: e });
  }
};

//update user
export const userUpdate = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User id is required to update!" });
    }

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      profile_pic_url,
      is_active,
    } = req.body;

    let updateData = {
      ...(first_name && { First_Name: first_name }),
      ...(last_name && { Last_Name: last_name }),
      ...(username && { Username: username }),
      ...(email && { Email: email }),
      ...(profile_pic_url && { Profile_Pic_Url: profile_pic_url }),
      ...(is_active !== undefined && { Is_Active: is_active }),
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.Password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await DB.User.update({
      where: { User_Id: userId },
      data: updateData,
    });


    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: "User id is required " });
    }

    await DB.User.delete({
      where: {
        User_Id: userId,
      },
    });

    res.status(204);
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

//get all users
export const getAllUser = async (_, res) => {
  try {
    const users = await DB.User.findMany({
      orderBy: {
        Created_At: "desc", // newest users first
      },
    });

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

//get user by id
export const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!userId) {
      return res.status(400).json({ message: "User id is required " });
    }

    const user = await DB.user.findFirst({
      where: {
        User_Id: userId,
      },
    });

    return res.status(200).json({ message: "Success", user });

  } catch (e) {
    res.status(500).json({ message: "Server errror", error: e.message });
  }
};
