import Photo from "../../../images/photoVi.jpg";

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='main__section-header about-me__header'>Студент</h2>
      <div className='about-me__student'>
        <div className='about-me__info-container'>
          <h2 className='about-me__name'>Виктория</h2>
          <p className='about-me__title'>Фронтенд-разработчик, 33 года</p>
          <p className='about-me__description'>
            Я родилась в Москве, где сейчас и живу, закончила РЭУ им.Плеханова.
            Долгое время занималась вопросами сертификации, после ухода моей
            последней компании Electrolux с рынка РФ начала учиться кодингу.
            Официально не замужем, но уже давно живу с гражданским мужем, детей
            нет. Люблю горный велосипед, горные лыжи и вообще все, что имеет
            отношение к горам.
          </p>
          <a
            href='https://github.com/nuncame'
            target='_blanc'
            className='about-me__gh-link'
          >
            Github
          </a>
        </div>
        <img src={Photo} alt='фото Ви' className='about-me__photo' />
      </div>
    </section>
  );
}
