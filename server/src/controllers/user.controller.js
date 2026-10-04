import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";

// token data user
function signToken(user) {
  return jwt.sign(
    { sub: user._id, email: user.email, name: user.name },
    config.jwtSecret,
    { expiresIn: config.jwtExpires }
  );
}

// POST /api/users/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nama, email, dan password wajib diisi" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ message: "Registrasi berhasil", id: user._id });
  } catch (err) {
    next(err);
  }
};

// POST /api/users/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const cocok = await bcrypt.compare(password, user.password);
    if (!cocok) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    res.json({ token: signToken(user) });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/me (buat yg login)
export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};