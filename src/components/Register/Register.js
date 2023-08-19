import AuthForm from "../AuthForm/AuthForm";

export default function Register() {
  return (
    <AuthForm
      title='Добро пожаловать!'
      name='register'
      email='vii@nuncame.com'
      password='12345'
      btnTitle='Зарегистрироваться'
      caption='Уже зарегистрированы?'
      link='/signin'
      linkCaption='Войти'
    >
      <h3 className='authForm__input-caption'>Имя</h3>
      <input
        type='text'
        className='authForm__input authForm__input_textfield_name'
        name='name'
        id='register-name-input'
        value='Вика'
        minLength='2'
        maxLength='40'
        placeholder=''
        required
      />
      <span className='authForm__input-error name-input-error'></span>
    </AuthForm>
  );
}
