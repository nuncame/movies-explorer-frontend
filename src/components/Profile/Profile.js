import { useState, useContext, useEffect } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/InputValidation";

export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isNameSame, setIsNameSame] = useState(true);
  const [isEmailSame, setIsEmailSame] = useState(true);

  const handleClick = () => setIsEdit(!isEdit);

  const { formValue, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleChangeName = (e) => {
    if (e.target.value === currentUser.name) {
      setIsNameSame(true);
    } else setIsNameSame(false);
    handleChange(e);
  };

  const handleChangeEmail = (e) => {
    if (e.target.value === currentUser.email) {
      setIsEmailSame(true);
    } else setIsEmailSame(false);
    handleChange(e);
  };

  const handleSubmit = (e) => {
    const { profileName, profileEmail } = formValue;
    e.preventDefault();
    props.handleDataUpdate(profileName, profileEmail);
    setIsEdit(false);
    resetForm();
    props.setAuthError(false);
  };

  useEffect(() => {
    setUserName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

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
                defaultValue={userName || ""}
                onChange={handleChangeName}
                minLength='2'
                maxLength='40'
                required
                placeholder={currentUser.name}
              />
            </div>
            <span className='authForm__input-error profileName-input-error'>
              {errors.profileName}
            </span>

            <div className='profile__container profile__email-container'>
              <p className='profile__text profile__email-caption'>E-mail</p>

              <input
                type='email'
                className='profile__input profile__input_textfield_email'
                name='profileEmail'
                id='profile-email-input'
                defaultValue={email || ""}
                onChange={handleChangeEmail}
                minLength='2'
                maxLength='40'
                pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
                required
              />
            </div>
            <span className='authForm__input-error profileEmail-input-error'>
              {errors.profileEmail}
            </span>

            <span className='profile__input-error'>{props.authError}</span>
            <button
              type='submit'
              className={`profile__submit-btn ${
                // !isValid && (isNameSame || isEmailSame) ? "profile__submit-btn_inactive" : ""
                isValid && (!isNameSame || !isEmailSame) ? "" : "profile__submit-btn_inactive"
              }`}
              disabled={isValid && (!isNameSame || !isEmailSame) ? false : true}
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
            <button
              type='button'
              className='profile__logout'
              onClick={props.onSignOut}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </main>
    </>
  );
}
