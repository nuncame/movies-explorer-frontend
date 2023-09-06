import { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies(props) {
  const [isError, setIsError] = useState(false);

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <SearchForm
        movies={props.userMovies}
        searchValue=''
        isShort={false}
        setRenderedMovies={props.setUserMovies}
        setIsShort={props.setIsShort}
        isSavedMovies={true}
        isError={isError}
        setIsError={setIsError}
      />
      <MoviesCardList
        isSavedMovies={true}
        userMovies={props.userMovies}
        movieDelete={props.movieDelete}
      />
      <Footer />
    </>
  );
}
