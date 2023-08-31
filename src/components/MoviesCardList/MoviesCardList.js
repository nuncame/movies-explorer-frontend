import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  const renderedMovies = props.renderedMovies;

  return (
    <>
      <main className='moviesCardList'>
        {props.isSavedMovies
          ? renderedMovies.map((movie) => (
              <MoviesCard
                key={movie.id || movie._id}
                isSaved={props.isSaved}
                movie={movie}
                onSaveClick={props.onSaveClick}
                isSavedMovies={props.isSavedMovies}
                userMovies={props.userMovies}
                movieDelete={props.movieDelete}
              />
            ))
          : ывчыфву
              ?.slice(0, props.roundedVisibleCardCount)
              .map((movie) => (
                <MoviesCard
                  key={movie.id || movie._id}
                  isSaved={props.isSaved}
                  movie={movie}
                  onSaveClick={props.onSaveClick}
                  isSavedMovies={props.isSavedMovies}
                  userMovies={props.userMovies}
                />
              ))}
      </main>
    </>
  );
}
