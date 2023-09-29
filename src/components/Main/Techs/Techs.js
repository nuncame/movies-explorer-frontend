export default function Techs() {
  return (
    <div className='techs-background'>
      <section className='techs'>
        <h2 className='main__section-header techs__header'>Технологии</h2>
        <h2 className='techs__title'>7 технологий</h2>
        <p className='techs__caption'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__tech-container'>
          <li className='techs__tech'>HTML</li>
          <li className='techs__tech'>CSS</li>
          <li className='techs__tech'>JS</li>
          <li className='techs__tech'>React</li>
          <li className='techs__tech'>Git</li>
          <li className='techs__tech'>Express.js</li>
          <li className='techs__tech'>mongoDB</li>
        </ul>
      </section>
    </div>
  );
}
