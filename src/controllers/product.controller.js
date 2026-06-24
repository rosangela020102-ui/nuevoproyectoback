import { getAllMovies } from "../services/product.service.js";

import { formatApiResponse } from "../utils/response.helper.js";

const getProducts = (req, res) => {
  try {
    const movies = getAllMovies();

    const response = formatApiResponse(true, movies, "Catálogo obtenido con éxito");
    return res.status(200).json(response);

  } catch (error) {
    const errorResponse = formatApiResponse(false, null, "Error interno al cargar el catálogo de películas");
    return res.status(500).json(errorResponse);
  }
};

export { getProducts };