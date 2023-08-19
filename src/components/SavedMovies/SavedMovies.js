import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  return (
    <>
      <Header isLoggedIn={true} />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList isSavedMovies={true} />
      <Footer />
    </>
  );
}
