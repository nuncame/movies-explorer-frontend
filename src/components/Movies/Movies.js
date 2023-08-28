import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Preloader from "../Preloader/Preloader";

export default function Movies(props) {
  // const [movies, setMovies] = useState([]);
  // const [foundMovies, setFoundMovies] = useState(
  //   JSON.parse(localStorage.getItem("storedMovies")) || []
  // );
  // const [isShort, setIsShort] = useState(
  //   localStorage.getItem("isShortMovie") || false
  //   );
  // const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  //   moviesApi
  //     .getMovies()
  //     .then((data) => {
  //       setMovies(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const LG_ROW_CARD_COUNT = 3;
  const MD_ROW_CARD_COUNT = 2;
  const SM_ROW_CARD_COUNT = 1;

  const LG_INITIAL_CARD_COUNT = 12;
  const MD_INITIAL_CARD_COUNT = 8;
  const SM_INITIAL_CARD_COUNT = 4;

  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isTablet = useMediaQuery("(min-width: 746px)");

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT
    : isTablet
    ? MD_ROW_CARD_COUNT
    : SM_ROW_CARD_COUNT;

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

  const [visibleCardCount, setVisibleCardCount] = useState(initialCardCount);

  const roundedVisibleCardCount =
    Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

  const handleMoreClick = () => {
    calculateCardCount();
  };

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
  };

  useEffect(() => {
    const length = localStorage.getItem("isShortMovie");
    const value = localStorage.getItem("searchValue");
    const storedMovies = JSON.parse(localStorage.getItem("storedMovies"));
    if (storedMovies) {
      props.setRenderedMovies(storedMovies);
      props.setIsShort(length);
      props.setSearchValue(value);
    }
  }, []);

  // function handleMovieSearch(isShortMovie, search) {
  //   const propsToCheckName = ["nameRU", "nameEN"];
  //   let result;
  //   if (isShortMovie) {
  //     result = props.movies.filter(
  //       (obj) =>
  //         propsToCheckName.some((key) =>
  //           String(obj[key]).toLowerCase().includes(search)
  //         ) && obj["duration"] <= 40
  //     );
  //   } else {
  //     result = props.movies.filter((obj) =>
  //       propsToCheckName.some((key) =>
  //         String(obj[key]).toLowerCase().includes(search)
  //       )
  //     );
  //   }
  //   return result;
  // }

  const isLoading = false;
  const isError = false;

  return (
    <div className='movies'>
      <Header isLoggedIn={props.isLoggedIn} />
      <SearchForm
        handleMovieSearch={props.handleMovieSearch}
        searchValue={props.searchValue}
        isShort={props.isShort}
        setRenderedMovies={props.setRenderedMovies}
        setIsShort={props.setIsShort}
        movies={props.movies}
      />
      {isLoading ? ( //это будет стейт для прелоадера
        <Preloader />
      ) : isError ? ( //а сюда стейт который будет наполняться при поиске фильмов
        <p className='movies__searchError'>{props.errorMsg}</p> //а в этот стейт - текст ошибки
      ) : (
        <MoviesCardList
          userMovies={props.userMovies}
          renderedMovies={props.renderedMovies}
          onSaveClick={props.handleSaveClick}
          roundedVisibleCardCount={roundedVisibleCardCount}
        />
      )}
      <div className='movies__more'>
        {props.renderedMovies.length > visibleCardCount && (
          <button
            className='movies__moreBtn'
            type='button'
            onClick={handleMoreClick}
          >
            Ещё
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
