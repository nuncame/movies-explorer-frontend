import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  return (
    <>
      <section className='moviesCardList'>
        <MoviesCard
          isSavedMovies={props.isSavedMovies}
          isSaved={false}
          name='33 слова о дизайне'
          length='1ч 47м'
          image='https://orbitar.media/2BrPlL2xZGKK0xVxLvIaCplzVtJ7AEDALI.jpg'
        />
        <MoviesCard
          isSavedMovies={props.isSavedMovies}
          isSaved={false}
          name='33 слова о дизайне'
          length='1ч 47м'
          image='https://orbitar.media/2BrPlL2xZGKK0xVxLvIaCplzVtJ7AEDALI.jpg'
        />
        <MoviesCard
          isSavedMovies={props.isSavedMovies}
          isSaved={true}
          name='33 слова о дизайне'
          length='1ч 47м'
          image='https://orbitar.media/2BrPlL2xZGKK0xVxLvIaCplzVtJ7AEDALI.jpg'
        />
      </section>
      <div className='moviesCardList__more'>
          <button className='moviesCardList__more-btn' type='button'>
            Ещё
          </button>
      </div>
    </>
  );
}
