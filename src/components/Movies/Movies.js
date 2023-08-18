import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies() {
  return (
    <>
      <Header isLoggedIn={true} />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList isSavedMovies={false} />
      <Footer />
    </>
  );
}
