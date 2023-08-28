import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from "../../utils/InputValidation";

export default function Register(props) {
  const { formValue, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    const { registerName, registerEmail, registerPassword } = formValue;
    e.preventDefault();
    props.handleRegister(registerName, registerEmail, registerPassword);
    resetForm();
  };

  return (
    <AuthForm
      title='Добро пожаловать!'
      name='register'
      btnTitle='Зарегистрироваться'
      caption='Уже зарегистрированы?'
      link='/signin'
      linkCaption='Войти'
      email={formValue.registerEmail}
      password={formValue.registerPassword}
      emailErr={errors.registerEmail}
      passwordErr={errors.registerPassword}
      isValid={isValid}
      onSubmit={handleSubmit}
      onChange={handleChange}
      authError={props.authError}
    >
      <h3 className='authForm__input-caption'>Имя</h3>
      <input
        type='text'
        className={`authForm__input authForm__input_textfield_name ${errors.registerName ? 'authForm__input_type_error' : ''}`}
        name='registerName'
        id='register-name-input'
        value={formValue.registerName}
        minLength='2'
        maxLength='40'
        placeholder=''
        required
        onChange={handleChange}
      />
      <span className='authForm__input-error name-input-error'>{errors.registerName}</span>
    </AuthForm>
  );
}
