import { useState } from "react";

export default function MoviesCard(props) {

  const [isAdded, setIsAdded] = useState(props.movie.isAdded)

  function timeConverter(number) {
    const h = Math.floor(number / 60);
    const min = number % 60;
    return h + "ч " + min + "м";
  }

  function handleSaveClick() {
    props.onSaveClick(props.movie);
    setIsAdded(!props.movie.isAdded);
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
            className={`moviesCard__saveBtn ${
              isAdded && "moviesCard__saveBtn_active"
            }`}
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
