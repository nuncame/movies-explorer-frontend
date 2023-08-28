import { useEffect, useRef, useState } from "react";
import Find from "../../images/FindIcon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm(props) {
  const [isEmpty, setIsEmpty] = useState(false);

  function changeMovieLength() {
    if (props.isShort) {
      props.setIsShort(false);
    } else
    props.setIsShort(true);
  }

  const movieSearchRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (movieSearchRef.current.value === "") {
      setIsEmpty(true);
    } else { setIsEmpty(false);
      const filteredMovies = props.handleMovieSearch(props.movies, movieSearchRef.current.value, props.isShort);
    props.setRenderedMovies(filteredMovies);
    console.log(filteredMovies);
    localStorage.setItem("storedMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("isShortMovie", props.isShort);
    localStorage.setItem("searchValue", movieSearchRef.current.value);
    }
  };

  const handleSearchSavedMovies = (e) => {
    e.preventDefault();
    if (movieSearchRef.current.value === "") {
      setIsEmpty(true);
    } else { setIsEmpty(false);
      const filteredMovies = props.handleMovieSearch(props.movies, movieSearchRef.current.value, props.isShort);
    props.setRenderedMovies(filteredMovies);
    console.log(filteredMovies);
    }
  };

  // props.setFoundMovies(props.handleMovieSearch(props.isShort, ));
  // localStorage.setItem("storedMovies", JSON.stringify(result));

  useEffect(() => {
    const updMovies = props.handleMovieSearch(props.movies, movieSearchRef.current.value, props.isShort);
    props.setRenderedMovies(updMovies);
    localStorage.setItem("isShortMovie", props.isShort);
    // localStorage.setItem("storedMovies", JSON.stringify(updMovies));
  }, [props.isShort]);

  return (
    <>
      <form className='searchForm' name='searchForm' onSubmit={props.isSavedMovies ? handleSearchSavedMovies : handleSearch}>
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
      <FilterCheckbox checkMovieLength={changeMovieLength} isShort={props.isShort} />
    </>
  );
}
