const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required",
  });
}

if (!EMAIL_REGEX.test(email)) {
  return res.status(400).json({
    message: "Invalid email format",
  });
}

if (password.length < 8) {
  return res.status(400).json({
    message: "Password must be at least 8 characters",
  });
}

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);
const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

const safeUser = {
  id: user._id,
  name: user.name,
  email: user.email,
};

res.status(201).json({
  success: true,
  user: safeUser,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);


    res.status(200).json({
      success: true,
      token,
      user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
}

    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
