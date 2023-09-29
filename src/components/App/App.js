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
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";

function App() {
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [renderedUserMovies, setRenderedUserMovies] = useState([]);
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShortMovie")) || false
  );
  const [searchValue, setSearchValue] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMovieLoadErr, setMovieLoadErr] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const token = `Bearer ${localStorage.getItem("token")}`;

  const savedSearchValue = localStorage.getItem("searchValue");
  const isShortMovie = localStorage.getItem("isShortMovie");

  useEffect(() => {
    if (savedSearchValue && isShortMovie) {
      setSearchValue(savedSearchValue);
    }
  })

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
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
    if (localStorage.getItem("token")) {
      setDataLoaded(false);
      mainApi
        .getCurrentUser(token)
        .then((data) => {
          if (data) {
            if (
              window.location.pathname === "/signin" ||
              window.location.pathname === "/signup"
            ) {
              navigate("/movies");
            }
            setLoggedIn(true);
            setCurrentUser(data);
            navigate(window.location.pathname);
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setDataLoaded(true);
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("isShortMovie");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("storedMovies");
    setDataLoaded(false);
    setLoggedIn(false);
    setCurrentUser({});
    setIsShort(false);
    setSearchValue("");
    setMovies([]);
    navigate("/");
  }

  function handleUserDataUpdate(name, email) {
    mainApi
      .setUserData(name, email, token)
      .then((data) => {
        setCurrentUser(data);
        setPopupOpen(true);
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setAuthError("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 400") {
          setAuthError("При обновлении профиля произошла ошибка.");
        }
      });
  }

  function getInitialMovies(func) {
    setMovieLoadErr(false);
    Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies(token)])
      .then(([allMovies, userSavedMovies]) => {
        setUserMovies(userSavedMovies);
        const userMoviesIds = userSavedMovies.map((mov) => mov.movieId);

        allMovies.forEach((mov) => {
          mov.isAdded = userMoviesIds.includes(mov.id);
        });
        setMovies(allMovies);
        if (func) {
          func(allMovies);
        }
      })
      .catch((err) => {
        console.log(err);
        setMovieLoadErr(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      });
  }

  function loadUserMovies() {
    mainApi
      .getSavedMovies(token)
      .then((data) => {
        setUserMovies(data);
        setRenderedUserMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieAdd(movie) {
    mainApi.addMovie(movie, token).then((mov) => {
      const renderFiltered = renderedMovies.map((item) => {
        if (item.id === movie.id) {
          item.isAdded = true;
        }
        return item;
      });
      setRenderedMovies(renderFiltered);
      setUserMovies([...userMovies, mov]);
    });
  }

  function handleMovieDelete(movie) {
    mainApi
      .deleteMovie(movie.movieId || movie.id, token)
      .then((res) => {
        window.localStorage.removeItem("storedMovies");
        const filtered = userMovies.filter(
          (mov) => mov.movieId !== res.movieId
        );
        setUserMovies(filtered);
        setRenderedUserMovies(filtered);
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

  function closePopup() {
    setPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <div className='page'>
          <Routes>
            <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
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
                      getInitialMovies={getInitialMovies}
                      isLoading={isLoading}
                      movieErr={isMovieLoadErr}
                      isLoggedIn={isLoggedIn}
                      checkToken={checkToken}
                      setIsLoading={setIsLoading}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                  dataLoaded={dataLoaded}
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
                      isShort={isShort}
                      renderedMovies={renderedMovies}
                      renderedUserMovies={renderedUserMovies}
                      setRenderedUserMovies={setRenderedUserMovies}
                      loadUserMovies={loadUserMovies}
                      isLoggedIn={isLoggedIn}
                      checkToken={checkToken}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                  dataLoaded={dataLoaded}
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
                <ProtectedRouteElement
                  element={
                    <Profile
                      onSignOut={signOut}
                      handleDataUpdate={handleUserDataUpdate}
                      authError={authError}
                      setAuthError={setAuthError}
                      isLoggedIn={isLoggedIn}
                      checkToken={checkToken}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                  dataLoaded={dataLoaded}
                />
              }
            />
            <Route path='*' element={<Error404 />} />
          </Routes>
          <ConfirmPopup isOpen={isPopupOpen} onClose={closePopup} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
