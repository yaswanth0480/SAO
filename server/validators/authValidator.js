
const { z } = require("zod");

const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(60),

  email: z.string()
    .trim()
    .email("Enter a valid email address")
    .max(254)
    .transform((value) => value.toLowerCase()),

  password: z.string()
    .min(8, "Password must contain at least 8 characters")
    .max(72, "Password is too long"),

  department: z.string().trim().max(80).optional(),
  college: z.string().trim().max(120).optional(),
}).strict();

const loginSchema = z.object({
  email: z.string()
    .trim()
    .email("Enter a valid email address")
    .max(254)
    .transform((value) => value.toLowerCase()),

  password: z.string()
    .min(1, "Password is required")
    .max(72),
}).strict();

module.exports = {
  registerSchema,
  loginSchema,
};
