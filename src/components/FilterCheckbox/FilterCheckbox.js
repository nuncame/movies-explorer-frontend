export default function FilterCheckbox() {
  return (
    <section className='filterCheckbox'>
      <label id='movie-checkbox' className='filterCheckbox__label'>
        <input type='checkbox' className='filterCheckbox__invisible'></input>
        <span className='filterCheckbox__visible'></span>
      </label>
      <p className='filterCheckbox__caption'>Короткометражки</p>
    </section>
  );
}
