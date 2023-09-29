import { useNavigate } from "react-router-dom";

export default function Error404(props) {
  const navigate = useNavigate();
  return (
    <>
      <h1 className='error404__header'>404</h1>
      <p className='error404__caption'>Страница не найдена</p>
      <button onClick={() => navigate(-2)} className='error404__btn'>Назад</button>
    </>
  );
}
