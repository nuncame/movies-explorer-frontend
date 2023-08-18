import Arrow from "../../../images/Arrow.svg";

export default function Portfolio() {
    return (
        <section className="portfolio">
        <h3 className='portfolio__header'>Портфолио</h3>
      <div className='portfolio__links-container'>
        <a href='https://nuncame.github.io/how-to-learn/' target="_blanc" className='portfolio__link'>
          <p className='portfolio__link-caption'>Статичный сайт</p>
          <img src={Arrow} alt='стрелка' className='portfolio__link-arrow' />
        </a>
        <a href='https://nuncame.github.io/russian-travel/' target="_blanc" className='portfolio__link'>
          <p className='portfolio__link-caption'>Адаптивный сайт</p>
          <img src={Arrow} alt='стрелка' className='portfolio__link-arrow' />
        </a>
        <a href='https://github.com/nuncame/react-mesto-api-full-gha' target="_blanc" className='portfolio__link'>
          <p className='portfolio__link-caption'>Одностраничное приложение</p>
          <img src={Arrow} alt='стрелка' className='portfolio__link-arrow' />
        </a>
      </div>
      </section>
    )
}