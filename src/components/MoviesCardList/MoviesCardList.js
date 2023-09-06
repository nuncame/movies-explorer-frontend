import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {

  return (
    <>
      <main className='moviesCardList'>
        {props.isSavedMovies
          ? props.userMovies.map((movie) => (
              <MoviesCard
                key={movie.id || movie._id}
                isSaved={props.isSaved}
                movie={movie}
                onSaveClick={props.onSaveClick}
                isSavedMovies={props.isSavedMovies}
                movieDelete={props.movieDelete}
              />
            ))
          : props.renderedMovies
              ?.slice(0, props.roundedVisibleCardCount)
              .map((movie) => (
                <MoviesCard
                  key={movie.id || movie._id}
                  isSaved={props.isSaved}
                  movie={movie}
                  onSaveClick={props.onSaveClick}
                  isSavedMovies={props.isSavedMovies}
                />
              ))}
      </main>
    </>
  );
}
