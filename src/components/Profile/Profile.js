import { useState, useContext, useEffect } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/InputValidation";


export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  
  const handleClick = () => setIsEdit(!isEdit);

  // const [formError, setFormError] = useState(props.authError);

  const { formValue, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  
    const handleSubmit = (e) => {
      const { profileName, profileEmail } = formValue;
      e.preventDefault();
      props.handleDataUpdate(profileName, profileEmail);
      // setUserName(profileName);
      // setEmail(e.target.value);
      // setFormError('');
      setIsEdit(false);
      resetForm();
    };


  useEffect(() => {
    setUserName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  // const handleNameChange = (e) => {
  //   setUserName(e.target.value);
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   props.handleDataUpdate(userName, email);
  //   setIsEdit(false);
  // };

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <main className='profile'>
        <h2 className='profile__header'>Привет, {currentUser.name}!</h2>
        {isEdit ? (
          <form
            className='profile__form'
            name='profileForm'
            onSubmit={handleSubmit}
          >
            <div className='profile__container profile__name-container'>
              <p className='profile__text profile__name-caption'>Имя</p>
              <input
                type='text'
                className='profile__input profile__input_textfield_name'
                name='profileName'
                id='profile-name-input'
                value={userName || ''}
                onChange={handleChange}
                minLength='2'
                maxLength='40'
                required
                placeholder={currentUser.name}
              />
            </div>
            <div className='profile__container profile__email-container'>
              <p className='profile__text profile__email-caption'>E-mail</p>

              <input
                type='email'
                className='profile__input profile__input_textfield_email'
                name='profileEmail'
                id='profile-email-input'
                value={email || ''}
                onChange={handleChange}
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
              className='profile__submit-btn'
            >
              Сохранить
            </button>
          </form>
        ) : (
          <>
            <div className='profile__container profile__name-container'>
              <p className='profile__text profile__name-caption'>Имя</p>
              <p className='profile__text profile__name'>{currentUser.name}</p>
            </div>
            <div className='profile__container profile__email-container'>
              <p className='profile__text profile__email-caption'>E-mail</p>
              <p className='profile__text profile__email'>
                {currentUser.email}
              </p>
            </div>
            <button
              className='profile__edit-btn'
              type='button'
              onClick={handleClick}
            >
              Редактировать
            </button>
            <button type='button' className='profile__logout' onClick={props.onSignOut} >
              Выйти из аккаунта
            </button>
          </>
        )}
      </main>
    </>
  );
}
