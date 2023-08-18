export default function Footer() {
  return (
    <div className='footer__background'>
      <section className='footer'>
        <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__captions">
            <p className="footer__year">&#169; 2023</p>
            <div className="footer__links">
                <a href="https://practicum.yandex.ru/" target="_blanc" className="footer__link">Яндекс.Практикум</a>
                <a href="https://github.com/" target="_blanc" className="footer__link">Github</a>
            </div>
        </div>
      </section>
    </div>
  );
}
