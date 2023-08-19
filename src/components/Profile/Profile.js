import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

export default function Profile(props) {
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = () => setIsEdit(!isEdit);

  return (
    <>
      <Header isLoggedIn={true} />
      <main className='profile'>
        <h2 className='profile__header'>Привет, {props.name}!</h2>
        {isEdit ? (
          <form className='profile__form'>
            <div className='profile__container profile__name-container'>
              <p className='profile__text profile__name-caption'>Имя</p>
              <input
                type='text'
                className='profile__input profile__input_textfield_name'
                name='name'
                id='profile-name-input'
                value={props.name}
                onChange={props.handleChange}
                minLength='2'
                maxLength='40'
                required
              />
            </div>
            <div className='profile__container profile__email-container'>
              <p className='profile__text profile__email-caption'>E-mail</p>

              <input
                type='email'
                className='profile__input profile__input_textfield_email'
                name='email'
                id='profile-email-input'
                value={props.email}
                onChange={props.handleChange}
                minLength='2'
                maxLength='40'
                required
              />
            </div>
            <span className='profile__input-error'>
              При обновлении профиля произошла ошибка.
            </span>
            <button
              type='submit'
              className='profile__submit-btn profile__submit-btn_inactive'
            >
              Сохранить
            </button>
          </form>
        ) : (
          <>
            <div className='profile__container profile__name-container'>
              <p className='profile__text profile__name-caption'>Имя</p>
              <p className='profile__text profile__name'>{props.name}</p>
            </div>
            <div className='profile__container profile__email-container'>
              <p className='profile__text profile__email-caption'>E-mail</p>
              <p className='profile__text profile__email'>{props.email}</p>
            </div>
            <button
              className='profile__edit-btn'
              type='button'
              onClick={handleClick}
            >
              Редактировать
            </button>
            <Link to='/signin' className='profile__logout'>
              Выйти из аккаунта
            </Link>
          </>
        )}
      </main>
    </>
  );
}
