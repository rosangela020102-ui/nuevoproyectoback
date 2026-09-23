import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  if (!name || !email || !password) {
    const error = new Error("Nombre, email y contraseña son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const userExists = await prisma.user.findUnique({
    where: { email }
  });

  if (userExists) {
    const error = new Error("El correo electrónico ya está registrado");
    error.statusCode = 400;
    throw error;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const assignedRole = role === "ADMIN" ? "ADMIN" : "USER";

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: assignedRole 
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return newUser;
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email y contraseña obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token
  };
};

export default { registerUser, loginUser };