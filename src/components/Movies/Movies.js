import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Preloader from "../Preloader/Preloader";
import { renderQuantities } from "../../constants/constants";

export default function Movies(props) {
  const {
    LG_ROW_CARD_COUNT,
    MD_ROW_CARD_COUNT,
    SM_ROW_CARD_COUNT,
    LG_INITIAL_CARD_COUNT,
    MD_INITIAL_CARD_COUNT,
    SM_INITIAL_CARD_COUNT,
    desktop,
    tablet,
  } = renderQuantities();

  const isDesktop = useMediaQuery(desktop);
  const isTablet = useMediaQuery(tablet);

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

  const [isError, setIsError] = useState(false);

  function handleSaveClick(movie) {
    if (!movie.isAdded) {
      props.movieAdd(movie);
    } else {
      props.movieDelete(movie);
    }
  }

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("storedMovies"));
    if (storedMovies) {
      props.setRenderedMovies(storedMovies);
    }
    setIsError(false);
  }, []);

  return (
    <div className='movies'>
      <Header isLoggedIn={props.isLoggedIn} />
      <SearchForm
        isError={isError}
        setIsError={setIsError}
        searchValue={props.searchValue}
        isShort={props.isShort}
        setRenderedMovies={props.setRenderedMovies}
        setIsShort={props.setIsShort}
        movies={props.movies}
        movieErr={props.movieErr}
        setVisibleCardCount={setVisibleCardCount}
        initialCardCount={initialCardCount}
        getMovies={props.getMovies}
        setIsLoading={props.setIsLoading}
      />
      {props.isLoading && isError === false ? (
        <Preloader />
      ) : (
        <MoviesCardList
          renderedMovies={props.renderedMovies}
          onSaveClick={handleSaveClick}
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
