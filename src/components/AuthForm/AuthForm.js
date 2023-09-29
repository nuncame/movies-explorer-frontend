import BeatFilmLogo from "../../images/BeatFilmLogo.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function AuthForm(props) {
  useEffect(() => {
    props.setAuthError(false);
  },[])

  return (
      <main className='authForm'>
        <Link to='/' className='authForm__logo-link'>
          <img src={BeatFilmLogo} alt='BeatFilm' className='authForm__logo' />
        </Link>
        <h1 className='authForm__header'>{props.title}</h1>
        <form
          className={`authForm__form authForm__form_type_${props.name}`}
          name='authForm'
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <h3 className='authForm__input-caption'>E-mail</h3>
          <input
            type='email'
            className={`authForm__input authForm__input_textfield_email ${props.emailErr ? 'authForm__input_type_error' : ''}`}
            name={`${props.name}Email`}
            id={`${props.name}-email-input`}
            value={props.email || ''}
            onChange={props.onChange}
            minLength='2'
            maxLength='40'
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            placeholder=''
            required
          />
          <span className={`authForm__input-error ${props.name}-email-input-error`}>{props.emailErr}</span>
          <h3 className='authForm__input-caption'>Пароль</h3>
          <input
            type='password'
            className={`authForm__input authForm__input_textfield_password ${props.passwordErr ? 'authForm__input_type_error' : ''}`}
            name={`${props.name}Password`}
            id={`${props.name}-password-input`}
            value={props.password || ''}
            onChange={props.onChange}
            minLength='2'
            maxLength='40'
            placeholder=''
            required
          />
          <span className={`authForm__input-error ${props.name}-email-input-error`}>{props.passwordErr}</span>

          <span className='authForm__error'>{props.authError}</span>
          <button type='submit' className={`authForm__submit-btn ${!props.isValid ? 'authForm__submit-btn_inactive': ''}`} disabled={props.isValid ? false : true}>
            {props.btnTitle}
          </button>
        </form>
        <div className='authForm__caption'>
          <p className='authForm__caption-text'>{props.caption}</p>
          <Link to={props.link} className='authForm__caption-link'>
            {props.linkCaption}
          </Link>
        </div>
      </main>
  );
}
