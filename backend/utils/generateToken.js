import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en variables de entorno");
  }

  return jwt.sign(
    { sub: userId }, // subject
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};
