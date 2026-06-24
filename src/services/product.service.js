import { MovieModel } from "../models/product.models.js";
export const getAllMovies = () => {
    const movies = [
        { id: 1, tittle: "The Irishman", genre:"Drama/Crimen", duration:"210 min", rating:"7.8"},
        { id: 2, tittle: "Roma", genre:"Drama", duration:"135 min", rating:"7.7"},
        { id: 3, tittle: "Guillermo del toro's Pinocchio", genre:"Animación/Fantasía", duration:"117 min", rating:"7.6"},
        { id: 4, tittle: "Society of the show", genre:"Supervivencia/Drama", duration:"144 min", rating:"7.8"},
    ];

    return movies.map(movie => new MovieModel(movie));
};

