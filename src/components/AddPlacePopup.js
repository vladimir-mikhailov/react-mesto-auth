import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSaving }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({});
    setErrors({});
    setIsFormValid(false);
  }, [isOpen]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest('form').checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
    setValues({});
    setErrors({});
  }

  return (
    <PopupWithForm
      name='add-card-form'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isSaving={isSaving}
      buttonValues={{ isSaving: 'Создание...', default: 'Создать' }}
    >
      <input
        type='text'
        id='place-name'
        className='form__input place-name'
        name='name'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        value={values.name || ''}
        onChange={handleChange}
      />
      {isOpen && (
        <span
          className={`form__input-error${
            errors.name === '' ? '' : ' form__input-error_visible'
          }`}
        >
          {errors.name}
        </span>
      )}
      <input
        type='url'
        id='place-img-src'
        className='form__input place-link'
        name='link'
        placeholder='Ссылка на картинку'
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      {isOpen && (
        <span
          className={`form__input-error${
            errors.link === '' ? '' : ' form__input-error_visible'
          }`}
        >
          {errors.link}
        </span>
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
