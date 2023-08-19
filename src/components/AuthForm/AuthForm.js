import BeatFilmLogo from "../../images/BeatFilmLogo.svg";
import { Link } from "react-router-dom";

export default function AuthForm(props) {
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
        >
          {props.children}
          <h3 className='authForm__input-caption'>E-mail</h3>
          <input
            type='email'
            className='authForm__input authForm__input_textfield_email'
            name='email'
            id={`${props.name}-email-input`}
            value={props.email}
            onChange={props.handleChange}
            minLength='2'
            maxLength='40'
            placeholder=''
            required
          />
          <span className='authForm__input-error email-input-error'></span>
          <h3 className='authForm__input-caption'>Пароль</h3>
          <input
            type='password'
            className='authForm__input authForm__input_type_error authForm__input_textfield_password'
            name='password'
            id={`${props.name}-password-input`}
            value={props.password}
            onChange={props.handleChange}
            minLength='2'
            maxLength='40'
            placeholder=''
            required
          />
          <span className='authForm__input-error password-input-error'>Какая-то ошибка...</span>

          <button type='submit' className='authForm__submit-btn'>
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
