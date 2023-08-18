import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileIcon from "../../images/ProfileIcon.svg";
import ProfileIconLight from "../../images/ProfileIconLight.svg";
import Burger from "../../images/Burger.svg";
import BurgerLight from "../../images/BurgerLight.svg";
import Close from "../../images/Close.svg";

export default function Navigation(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClick = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className={`navigation ${menuOpen ? "navigation__open" : ""}`}>
        <div className='navigation__movies'>
          <button className={`${menuOpen ? "navigation__close-btn" : "navigation__close-btn_disabled"}`} type='button' onClick={handleClick} ></button>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${isActive ? "navigation__link_active" : ""} ${
                menuOpen ? "navigation__link" : "navigation__link__closed"
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
            src={`${
              props.isLight && menuOpen === false
                ? ProfileIconLight
                : ProfileIcon
            }`}
            alt='профиль'
            className='navigation__profile-icon'
          />
        </NavLink>
      </nav>
      <button
        className='navigation__burger-btn'
        type='button'
        onClick={handleClick}
      >
        <img
          src={`${props.isLight ? BurgerLight : Burger}`}
          alt='меню'
          className='navigation__burger-icon'
        />
      </button>
    </>
  );
}
