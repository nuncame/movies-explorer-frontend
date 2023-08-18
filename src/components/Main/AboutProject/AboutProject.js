export default function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='main__section-header about-project__header'>О проекте</h2>
      <ul className='about-project__table'>
        <li className='about-project__table-column'>
          <h3 className='about-project__table-header'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__table-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__table-column'>
          <h3 className='about-project__table-header'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__table-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about-project__timing-container'>
          <h3 className='about-project__timing-header about-project__timing-header_type_backend'>1 неделя</h3>
          <h3 className='about-project__timing-header about-project__timing-header_type_frontend'>4 недели</h3>
          <p className='about-project__timing-text'>Back-end</p>
          <p className='about-project__timing-text'>Front-end</p>
      </div>
    </section>
  );
}
