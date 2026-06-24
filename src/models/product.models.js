export class MovieModel {
    constructor({ id, title, genre, duration, rating }) {
        this.id = Number(id);

        if (!title) throw new Error("El título de la película es obligatorio.");
    this.title = String(title);
    
    if (!genre) throw new Error("El género de la película es obligatorio.");
    this.genre = String(genre);
    
    this.duration = String(duration || "0 min");
    
    const parsedRating = Number(rating);
    if (parsedRating < 0 || parsedRating > 10) {
      throw new Error("El rating debe ser un número entre 0 y 10.");
    }
    this.rating = parsedRating;
    }
}

