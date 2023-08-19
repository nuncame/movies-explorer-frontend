import Find from '../../images/FindIcon.svg';

export default function SearchForm(props) {
    return (
        <form className='searchForm' name='searchForm'
        onSubmit={props.onSubmit}>
            <img src={Find} alt="поиск" className="searchForm__image" />
            <input
            type='search'
            className='searchForm__input'
            name='movie'
            id={`${props.name}'-searchMovie-input`}
            onChange={props.handleChange}
            placeholder='Фильм'
          />
        <button className='searchForm__search-btn' type='button'></button>
        </form>
    )
}