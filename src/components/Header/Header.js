import BeatFilmLogo from "../../images/BeatFilmLogo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header(props) {
  return (
    <header className='header'>
      <Link to='/' className='header__logo-link'>
        <img src={BeatFilmLogo} alt='BeatFilm' className='header__logo' />
      </Link>

      <div className='header__links'>
        {props.isLoggedIn ? (
          <Navigation isLight={props.isLight} />
        ) : (
          <div className="header__account-actions">
            <Link to='/signup' className='header__register-link'>
              Регистрация
            </Link>
            <button
              to='/signup'
              className='header__login-btn'
              onClick={() => (window.location.href = "/signin")}
            >
              Войти
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
