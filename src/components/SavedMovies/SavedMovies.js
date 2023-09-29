import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies(props) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    props.loadUserMovies();
  }, [])

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <SearchForm
        movies={props.userMovies}
        searchValue=''
        isShort={props.isShort}
        setRenderedUserMovies={props.setRenderedUserMovies}
        setIsShort={props.setIsShort}
        isSavedMovies={true}
        isError={isError}
        setIsError={setIsError}
      />
      <MoviesCardList
        isSavedMovies={true}
        renderedMovies={props.renderedMovies}
        renderedUserMovies={props.renderedUserMovies}
        movieDelete={props.movieDelete}
      />
      <Footer />
    </>
  );
}
