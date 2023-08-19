import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <>
      <h1 className='error404__header'>404</h1>
      <p className='error404__caption'>Страница не найдена</p>
      <Link to='/' className='error404__link'>Назад</Link>
    </>
  );
}
