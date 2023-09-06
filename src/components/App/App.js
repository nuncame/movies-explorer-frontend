import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Error404 from "../Error404/Error404";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [isShort, setIsShort] = useState(
    localStorage.getItem("isShortMovie") || false
  );
  const [searchValue, setSearchValue] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMovieLoadErr, setMovieLoadErr] = useState(false);
  const navigate = useNavigate();

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        navigate("/movies");
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setAuthError("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 400") {
          setAuthError("При регистрации пользователя произошла ошибка.");
        }
      });
  }

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setCurrentUser(data);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err.message);
        if (err === "Ошибка: 401") {
          setAuthError("Вы ввели неправильный логин или пароль.");
        } else if (err === "Ошибка: 403") {
          setAuthError(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        }
      });
  }

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getCurrentUser()
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getCurrentUser()
        .then((userData) => {
          setCurrentUser(userData);
          getMovies();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("isShortMovie");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("storedMovies");
    setCurrentUser({});
    setIsShort(false);
    setSearchValue("");
    setMovies([]);
    navigate("/signin");
  }

  function handleUserDataUpdate(name, email) {
    mainApi
      .setUserData(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setAuthError("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 400") {
          setAuthError("При обновлении профиля произошла ошибка.");
        }
      });
  }

  function loadUserMovies(allMovies) {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setUserMovies(data);
        const userMoviesIds = data.map((mov) => mov.movieId);

        allMovies.forEach((mov) => {
          mov.isAdded = userMoviesIds.includes(mov.id);
        });
        setMovies(allMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getMovies() {
    setIsLoading(true);
    setMovieLoadErr(false);
    moviesApi
      .getMovies()
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false);
          loadUserMovies(data);
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        setMovieLoadErr(true);
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

  function handleMovieAdd(movie) {
    mainApi.addMovie(movie).then((mov) => {
      const renderFiltered = renderedMovies.map((item) => {
        if (item.id === movie.id) {
          item.isAdded = true;
        }
        return item;
      });

      console.log(renderFiltered);

      setRenderedMovies(renderFiltered);
      setUserMovies([...userMovies, mov]);
    });
  }

  function handleMovieDelete(movie) {
    mainApi
      .deleteMovie(movie.movieId || movie.id)
      .then((res) => {
        window.localStorage.removeItem("storedMovies");
        const filtered = userMovies.filter(
          (mov) => mov.movieId !== res.movieId
        );
        setUserMovies(filtered);
        const userMoviesIds = filtered.map((mov) => mov.movieId);
        renderedMovies.forEach((mov) => {
          mov.isAdded = userMoviesIds.includes(mov.id);
        });

        setRenderedMovies(renderedMovies);
        localStorage.setItem("storedMovies", JSON.stringify(renderedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <div className='page'>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRouteElement
                  element={<Main />}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  element={
                    <Movies
                      movies={movies}
                      userMovies={userMovies}
                      movieAdd={handleMovieAdd}
                      movieDelete={handleMovieDelete}
                      setRenderedMovies={setRenderedMovies}
                      setIsShort={setIsShort}
                      setSearchValue={setSearchValue}
                      searchValue={searchValue}
                      isShort={isShort}
                      renderedMovies={renderedMovies}
                      getMovies={getMovies}
                      isLoading={isLoading}
                      movieErr={isMovieLoadErr}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={
                    <SavedMovies
                      movies={userMovies}
                      userMovies={userMovies}
                      setUserMovies={setUserMovies}
                      setRenderedMovies={setRenderedMovies}
                      setIsShort={setIsShort}
                      movieDelete={handleMovieDelete}
                      searchValue={searchValue}
                      isShort={isShort}
                      renderedMovies={renderedMovies}
                      loadUserMovies={loadUserMovies}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/signup'
              element={
                <Register
                  handleRegister={handleRegister}
                  authError={authError}
                  setAuthError={setAuthError}
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login
                  handleLogin={handleLogin}
                  authError={authError}
                  setAuthError={setAuthError}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                  onSignOut={signOut}
                  handleDataUpdate={handleUserDataUpdate}
                  authError={authError}
                  setAuthError={setAuthError}
                />
              }
            />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
