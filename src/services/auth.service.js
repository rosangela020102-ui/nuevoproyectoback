import { pool } from "../config/db.js";

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (userExists.rows.length > 0) {
    throw new Error("El correo electrónico ya está registrado");
  }

  const newUser = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, password, "user"]
  );

  return newUser.rows[0];
};

const loginUser = async (email, password) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user || user.password !== password) {
    throw new Error("Credenciales inválidas");
  }

  const token = `simulated-jwt-token-for-${user.id}`;

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token
  };
};

export default { registerUser, loginUser };