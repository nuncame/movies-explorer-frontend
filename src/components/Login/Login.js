import AuthForm from "../AuthForm/AuthForm";

export default function Login() {
  return (
    <AuthForm
      title='Рады видеть!'
      name='login'
      email='vii@nuncame.com'
      password='12345'
      btnTitle='Войти'
      caption='Еще не зарегистрированы?'
      link='/signup'
      linkCaption='Регистрация'
    />
  );
}
