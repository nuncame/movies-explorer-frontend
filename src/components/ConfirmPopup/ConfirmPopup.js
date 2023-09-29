import Success from '../../images/Success.png'

export default function ConfirmPopup(props) {
  return (
    <div
      className={`confirmPopup ${props.isOpen ? "confirmPopup_active" : ""}`}
    >
      <div className='confirmPopup__container'>
      <img
          src={Success}
          alt='успешно'
          className='confirmPopup__icon'
        ></img>
        <h2 className='confirmPopup__caption'>Данные успешно обновлены</h2>
        <button
          type='button'
          className='confirmPopup__ok-btn'
          onClick={props.onClose}
        >Отлично</button>
      </div>
    </div>
  );
}
