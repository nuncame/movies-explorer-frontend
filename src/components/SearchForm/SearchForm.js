import { useEffect, useRef, useState } from "react";
import Find from "../../images/FindIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import handleMovieSearch from "../../utils/MovieSearch";

export default function SearchForm(props) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);

  function changeMovieLength() {
    if (props.isShort) {
      props.setIsShort(false);
    } else props.setIsShort(true);
  }

  const movieSearchRef = useRef();

  const handleSearch = (e) => {
    setIsError(false);
    console.log(props.movies);
    e.preventDefault();
    if (movieSearchRef.current.value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      const filteredMovies = handleMovieSearch(
        props.movies,
        movieSearchRef.current.value,
        props.isShort
      );
      if (filteredMovies.length === 0) {
        setIsError(true);
      }
      props.setRenderedMovies(filteredMovies);
      console.log(filteredMovies);
      localStorage.setItem("storedMovies", JSON.stringify(filteredMovies));
      localStorage.setItem("isShortMovie", props.isShort);
      localStorage.setItem("searchValue", movieSearchRef.current.value);
    }
  };

  const handleSearchSavedMovies = (e) => {
    setIsError(false);
    e.preventDefault();
    if (movieSearchRef.current.value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      const filteredMovies = handleMovieSearch(
        props.movies,
        movieSearchRef.current.value,
        props.isShort
      );
      props.setRenderedMovies(filteredMovies);
      console.log(filteredMovies);
    }
  };

  useEffect(() => {
    const updMovies = handleMovieSearch(
      props.movies,
      movieSearchRef.current.value,
      props.isShort
    );
    props.setRenderedMovies(updMovies);
    if (updMovies.length > 0) {
      localStorage.setItem("storedMovies", JSON.stringify(updMovies));
    }
    localStorage.setItem("isShortMovie", props.isShort);
  }, [props.isShort]);

  return (
    <>
      <form
        className='searchForm'
        name='searchForm'
        onSubmit={props.isSavedMovies ? handleSearchSavedMovies : handleSearch}
      >
        <div className='searchForm__search'>
          <img src={Find} alt='поиск' className='searchForm__image' />
          <input
            type='search'
            className='searchForm__input'
            name='movie'
            id={`${props.name}'-searchMovie-input`}
            placeholder='Фильм'
            ref={movieSearchRef}
            defaultValue={props.searchValue}
          />
          <button className='searchForm__search-btn' type='submit'></button>
        </div>
        <span
          className={`searchForm-error ${isEmpty && "searchForm-error-active"}`}
        >
          Нужно ввести ключевое слово
        </span>
      </form>
      <FilterCheckbox
        checkMovieLength={changeMovieLength}
        isShort={props.isShort}
      />
      {isError ? (
        <p className='movies__searchError'>Ничего не найдено</p>
      ) : (
        <></>
      )}
    </>
  );
}
