export default function MoviesCard(props) {
    const moviesCardSavedBtnClassName = `moviesCard__saveBtn ${
        props.isSaved && "moviesCard__saveBtn_active"
      }`;


    return (
        <article className="moviesCard">
            <div className="moviesCard__caption">
                <h2 className="moviesCard__name">{props.name}</h2>
                <p className="moviesCard__length">{props.length}</p>
                {props.isSavedMovies ? (<button className='moviesCard__delBtn' type='button' />) : (
                <button className={moviesCardSavedBtnClassName} type='button' /> )}
            </div>
            <img className="moviesCard__img" src={props.image} alt={props.name} />
        </article>
    )
}