import { useEffect, useRef, useState } from "react";
import Find from "../../images/FindIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import handleMovieSearch from "../../utils/MovieSearch";

export default function SearchForm(props) {
  const [isEmpty, setIsEmpty] = useState(false);

  const movieSearchRef = useRef();

  const handleSearch = (e) => {
    props.setIsError(false);
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
        props.setIsError(true);
      }

      props.setRenderedMovies(filteredMovies);
      localStorage.setItem("storedMovies", JSON.stringify(filteredMovies));
      window.localStorage.setItem("isShortMovie", props.isShort);
      localStorage.setItem("searchValue", movieSearchRef.current.value);
    }
  };

  const handleSearchSavedMovies = (e) => {
    props.setIsError(false);
    e.preventDefault();
    if (movieSearchRef.current.value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      console.log(props.movies);
      const filteredMovies = handleMovieSearch(
        props.movies,
        movieSearchRef.current.value,
        props.isShort
      );
      props.setRenderedMovies(filteredMovies);
    }
  };

  useEffect(() => {
    const updMovies = handleMovieSearch(
      props.movies,
      movieSearchRef.current.value,
      props.isShort
    );
    props.setIsError(false);
    if (updMovies.length === 0) {
      props.setIsError(true);
    }
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
      <FilterCheckbox setIsShort={props.setIsShort} isShort={props.isShort} />
      {props.isError ? (
        <p className='searchForm-generalError searchForm-searchError'>
          Ничего не найдено
        </p>
      ) : props.movieErr ? (
        <p className='searchForm-generalError searchForm-movError'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        <></>
      )}
    </>
  );
}
