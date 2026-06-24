import jwt from "jsonwebtoken";

const usersDatabase = [];
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura";

const registerUser = async (userData) => {
  const { email, password, name } = userData;

  const userExists = usersDatabase.find(u => u.email === email);
  if (userExists) {
    throw new Error("El correo electrónico ya está registrado");
  }

  const newUser = {
    id: usersDatabase.length + 1,
    name,
    email,
    password, 
    role: "user"
  };

  usersDatabase.push(newUser);
  return newUser;
};

const loginUser = async (email, password) => {
  const user = usersDatabase.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "24h" });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token
  };
};

export default { registerUser, loginUser, usersDatabase };