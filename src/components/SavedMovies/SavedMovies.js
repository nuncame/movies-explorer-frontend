import { useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies(props) {
  useEffect(() => {
    props.loadUserMovies();
  }, []);

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <SearchForm
        movies={props.movies}
        searchValue=''
        isShort={false}
        setRenderedMovies={props.setRenderedMovies}
        setIsShort={props.setIsShort}
        isSavedMovies={true}
      />
      <MoviesCardList
        isSavedMovies={true}
        renderedMovies={props.renderedMovies}
        userMovies={props.userMovies}
        movieDelete={props.movieDelete}
      />
      <Footer />
    </>
  );
}
