import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from "../../utils/InputValidation";

export default function Login(props) {
  const [formError, setFormError] = useState(props.authError);

  const { formValue, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  
    const handleSubmit = (e) => {
      const { loginEmail, loginPassword } = formValue;
      e.preventDefault();
      props.handleLogin(loginEmail, loginPassword);
      setFormError('');
      resetForm();
    };

    
  // function handleError() {
  //   if (props.authError.code === 401) {
  //     return('Вы ввели неправильный логин или пароль.');
  //   } else if (props.authError.code === 403) {
  //     return('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
  //   } else if (props.authError.code === 401) {
  //     return('При авторизации произошла ошибка. Переданный токен некорректен.');
  //   }
  // }

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
      authError={formError}
    />
  );
}
