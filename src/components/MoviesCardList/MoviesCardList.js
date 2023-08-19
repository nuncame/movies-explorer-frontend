import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  return (
    <>
      <main className='moviesCardList'>
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
      </main>
      <div className='moviesCardList-more'>
          <button className='moviesCardList-moreBtn' type='button'>
            Ещё
          </button>
      </div>
    </>
  );
}
