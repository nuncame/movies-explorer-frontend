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
  const [renderedMovies, setRenderedMovies] = useState(JSON.parse(localStorage.getItem("storedMovies")) || []);
  const [isShort, setIsShort] = useState(localStorage.getItem("isShortMovie"));
  const [searchValue, setSearchValue] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);
  const navigate = useNavigate();

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        // if (err.includes(409)) {
        //   setAuthError("Пользователь с таким email уже существует.");
        // } else if (err.includes(400)) {
        //   setAuthError("При регистрации пользователя произошла ошибка.");
        // }
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
        console.log(err);
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     mainApi
  //       .getCurrentUser()
  //       .then((data) => {
  //         console.log(data);
  //         setCurrentUser(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [isLoggedIn]);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("isShortMovie");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("storedMovies");
    setCurrentUser({});
    setIsShort(false);
    setSearchValue('');
    setMovies([])
    navigate("/signin");
  }

  function handleUserDataUpdate(name, email) {
    mainApi
      .setUserData(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(() => {
        setAuthError(true);
      });
  }

  function loadUserMovies(allMovies) {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setUserMovies(data);
        const userMoviesIds = data.map((mov) => mov.movieId);

        allMovies.forEach((mov) => {
          mov.isAdded = userMoviesIds.includes(mov.id)
        }
        );
        setMovies(allMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getMovies() {
    moviesApi
      .getMovies()
      .then((data) => {
        // setMovies(data);
        loadUserMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // loadUserMovies();
  }

  function handleSaveClick(movie) {
    // const userMoviesIds = userMovies.map((mov) => mov.movieId);

    // const isAdded = () => {
    //   if (userMoviesIds.includes(movie.id)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    mainApi
      .changeMovieAdded(movie)
      .then((updMovie) => {
        //сюда приходит ответ с фильмом из моего апи
        setRenderedMovies((state) => 
        state.map((mov) => {
          console.log(mov.id);
          console.log(movie.id);
          if (mov.id === movie.id) {
            mov.isAdded = !movie.isAdded;
          }
        }));
        // renderedMovies.forEach(mov => console.log(mov, movie))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDelete(movie) {
    mainApi
      .deleteMovie(movie.movieId)
      .then(() => {
        console.log(userMovies);
        setRenderedMovies((state) =>
          state.filter((mov) => mov.movieId !== movie.movieId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function getSavedMovies() {
  //   mainApi.getSavedMovies().then((movies) => {
  //     setMyMovies(movies);
  //   })
  // }

  // function handleSaveClick() {

  // }

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
                      handleSaveClick={handleSaveClick}
                      setRenderedMovies={setRenderedMovies}
                      setIsShort={setIsShort}
                      setSearchValue={setSearchValue}
                      searchValue={searchValue}
                      isShort={isShort}
                      renderedMovies={renderedMovies}
                      getMovies={getMovies}
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
                      userMovies={userMovies} // убрать - перенести из MoviesCardLIst лишнее выше
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
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login handleLogin={handleLogin} authError={authError} />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                  onSignOut={signOut}
                  handleDataUpdate={handleUserDataUpdate}
                  authError={authError}
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
