import WebWorldLogo from "../../../images/WebWorldLogo.svg";

export default function Promo() {
  return (
    <div className='promo__background'>
      <section className='promo'>
        <div className='promo__captions'>
          <h1 className='promo__header'>
            Учебный проект студента факультета <span className='promo__header-span'>Веб-разработки.</span>
          </h1>
          <p className='promo__text'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className='promo__logo' alt='мир веба' src={WebWorldLogo} />
      </section>
    </div>
  );
}
