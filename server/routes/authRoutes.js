
const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  register,
  login,
  logout,
  getMe,
} = require("../controllers/authController");

const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");

const {
  registerSchema,
  loginSchema,
} = require("../validators/authValidator");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Try again later.",
  },
});

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  register
);

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  login
);

router.post("/logout", logout);
router.post("/register", authLimiter, validate(registerSchema), register);
router.get("/me", authenticate, getMe);

module.exports = router;
