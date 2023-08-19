import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileIcon from "../../images/ProfileIcon.svg";
import Burger from "../../images/Burger.svg";

export default function Navigation(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClick = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className={`navigation ${menuOpen ? "navigation_open" : ""}`}>
        <div className='navigation__movies'>
          <button
            className={`navigation__close-btn ${
              menuOpen
                ? ""
                : "navigation__close-btn_disabled"
            }`}
            type='button'
            onClick={handleClick}
          ></button>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""} ${
                menuOpen ? "" : "navigation__link_closed"
              }`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""} ${
                props.isLight && menuOpen === false && "navigation__link_light"
              }`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""} ${
                props.isLight && menuOpen === false && "navigation__link_light"
              }`
            }
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to='/profile'
          className={`navigation__profile-caption ${
            props.isLight &&
            menuOpen === false &&
            "navigation__profile-caption_light"
          }`}
        >
          Аккаунт
          <img
            src={ProfileIcon}
            alt='профиль'
            className={`navigation__profile-icon ${
              props.isLight && menuOpen === false
                ? "navigation__profile-icon_light"
                : "navigation__profile-icon_dark"
            }`}
          />
        </NavLink>
      </nav>
      <button
        className='navigation-burgerBtn'
        type='button'
        onClick={handleClick}
      >
        <img
          src={Burger}
          alt='меню'
          className='navigation-burgerIcon'
        />
      </button>
    </>
  );
}
