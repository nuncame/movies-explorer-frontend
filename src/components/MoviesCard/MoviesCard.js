export default function MoviesCard(props) {
  const foundMovies = props.foundMovies;
  const userMoviesIds = props.userMovies.map((movie) => movie.movieId);

  function checkIfAdded() {
    if (userMoviesIds.includes(props.movie.id)) {
      return true;
    } else {
      return false;
    }
  }

  const isAdded = checkIfAdded();

  const moviesCardSavedBtnClassName = `moviesCard__saveBtn ${
    isAdded && "moviesCard__saveBtn_active"
  }`;

  function timeConverter(number) {
    const h = Math.floor(number / 60);
    const min = number % 60;
    return h + "ч " + min + "м";
  }

  function handleSaveClick() {
    props.onSaveClick(props.movie);
  }

  function handleMovieDelete() {
    props.movieDelete(props.movie);
  }


  return (
    <article className='moviesCard'>
      <div className='moviesCard__caption'>
        <h2 className='moviesCard__name'>{props.movie.nameRU}</h2>
        <p className='moviesCard__length'>
          {timeConverter(props.movie.duration)}
        </p>
        {props.isSavedMovies ? (
          <button className='moviesCard__delBtn' type='button' onClick={handleMovieDelete} />
        ) : (
          <button
            className={moviesCardSavedBtnClassName}
            onClick={handleSaveClick}
            type='button'
          />
        )}
      </div>
      <a className='moviesCard__trailerLink' href={props.movie.trailerLink} target='_blanc'>
        <img
          className='moviesCard__img'
          src={props.isSavedMovies ? props.movie.image : ("https://api.nomoreparties.co/" + props.movie.image.url) }
          alt={props.movie.nameRU}
        />
      </a>
    </article>
  );
}
