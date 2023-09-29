const MOVIES_API_URL = "https://api.nomoreparties.co";

class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._url}/signin/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getCurrentUser(token) {
    this._headers.Authorization = token;
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserData(name, email, token) {
    this._headers.Authorization = token;
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(this._checkResponse);
  }

  getSavedMovies(token) {
    this._headers.Authorization = token;
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addMovie(data, token) {
    this._headers.Authorization = token;
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: MOVIES_API_URL + "/" + data.image.url,
        trailer: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: MOVIES_API_URL + data.image.formats.thumbnail.url,
        movieId: data.id,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(data, token) {
    this._headers.Authorization = token;
    return fetch(`${this._url}/movies/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  // baseUrl: "http://localhost:3000",
  baseUrl: "https://api.mymovies-nuncame.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});

export { mainApi };
