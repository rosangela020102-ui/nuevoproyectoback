import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true, 
});

export default clienteAxios;