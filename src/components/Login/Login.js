import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from "../../utils/InputValidation";

export default function Login(props) {
  const { formValue, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    const { loginEmail, loginPassword } = formValue;
    e.preventDefault();
    props.handleLogin(loginEmail, loginPassword);
    props.setAuthError(false);
    resetForm();
  };

  return (
    <AuthForm
      title='Рады видеть!'
      name='login'
      email={formValue.loginEmail}
      password={formValue.loginPassword}
      emailErr={errors.loginEmail}
      passwordErr={errors.loginPassword}
      isValid={isValid}
      btnTitle='Войти'
      caption='Еще не зарегистрированы?'
      link='/signup'
      linkCaption='Регистрация'
      onSubmit={handleSubmit}
      onChange={handleChange}
      authError={props.authError}
      setAuthError={props.setAuthError}
    />
  );
}
