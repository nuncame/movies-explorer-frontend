import { useEffect, useRef, useState } from "react";
import Find from "../../images/FindIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import handleMovieSearch from "../../utils/MovieSearch";

export default function SearchForm(props) {
  const [isEmpty, setIsEmpty] = useState(false);

  const movieSearchRef = useRef();
  const storedMovies = JSON.parse(localStorage.getItem("storedMovies"));

  function searchMovie(allMovies) {
    props.setIsError(false);
    props.setVisibleCardCount(props.initialCardCount);
    if (movieSearchRef.current.value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      const filteredMovies = handleMovieSearch(
        allMovies,
        movieSearchRef.current.value,
        props.isShort
      );
      if (filteredMovies.length === 0) {
        props.setIsError(true);
      }

      props.setRenderedMovies(filteredMovies);
      localStorage.setItem("storedMovies", JSON.stringify(filteredMovies));
      localStorage.setItem("isShortMovie", props.isShort);
      localStorage.setItem("searchValue", movieSearchRef.current.value);
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    if (!storedMovies && !Array.isArray(storedMovies)) {
      props.setIsLoading(true);
      props.getInitialMovies(searchMovie);
    } else searchMovie(props.movies);
  }

  useEffect(() => {
    if (!props.isSavedMovies && Array.isArray(storedMovies)) {
      props.getInitialMovies();
    }
  }, [])

  const handleSearchSavedMovies = (e) => {
    props.setIsError(false);
    e.preventDefault();
    if (movieSearchRef.current.value === "") {
      props.setRenderedUserMovies(props.movies);
      console.log(props.movies);
    } else {
      setIsEmpty(false);
      console.log(props.movies);
      const filteredMovies = handleMovieSearch(
        props.movies,
        movieSearchRef.current.value,
        props.isShort
      );
      props.setRenderedUserMovies(filteredMovies);
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
    if (!props.isSavedMovies) {
      props.setRenderedMovies(updMovies);
      if (updMovies.length > 0) {
        localStorage.setItem("storedMovies", JSON.stringify(updMovies));
      }
      localStorage.setItem("isShortMovie", props.isShort);
    }
    if (props.isSavedMovies) {
      props.setRenderedUserMovies(updMovies);
    }
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
