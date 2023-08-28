class MoviesApi {
  getMovies() {
    return fetch("https://api.nomoreparties.co/beatfilm-movies", {
      method: "GET",
    //   headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

const moviesApi = new MoviesApi();

export { moviesApi };
