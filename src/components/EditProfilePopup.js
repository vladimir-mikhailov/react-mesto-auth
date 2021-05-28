import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSaving }) {
  const currentUser = useContext(CurrentUserContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(currentUser);
    setIsFormValid(false);
  }, [currentUser, isOpen]);

  function formValidation(input) {
    setIsFormValid(input.closest('form').checkValidity());
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    formValidation(e.target);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name='edit-form'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isSaving={isSaving}
      buttonValues={{ isSaving: 'Сохранение...', default: 'Сохранить' }}
    >
      <input
        type='text'
        id='profile-name'
        className='form__input form__input_type_name'
        name='name'
        placeholder='Имя'
        minLength='2'
        maxLength='40'
        required
        onChange={handleChange}
        value={values.name || ''}
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
        type='text'
        id='profile-description'
        className='form__input form__input_type_description'
        name='about'
        placeholder='О себе'
        minLength='2'
        maxLength='200'
        required
        onChange={handleChange}
        value={values.about || ''}
      />
      {isOpen && (
        <span
          className={`form__input-error${
            errors.about === '' ? '' : ' form__input-error_visible'
          }`}
        >
          {errors.about}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
