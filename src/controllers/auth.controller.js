import authService from "../services/auth.service.js";
import { formatResponse } from "../utils/response.helper.js";

const register = async (req, res, next) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(formatResponse(true, "Usuario registrado con éxito", newUser));
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginData = await authService.loginUser(email, password);
    res.status(200).json(formatResponse(true, "Inicio de sesión correcto", loginData));
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json(formatResponse(true, "Perfil de usuario obtenido", req.user || { message: "Simulación de perfil" }));
  } catch (error) {
    next(error);
  }
};

export default { register, login, getMe };