import PopupWithForm from './PopupWithForm';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Input from './Input';
import { useFormValidation } from './useFormValidation';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSaving,
  handleClickOnOverlay,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    setValues,
    errors,
    isFormValid,
    setIsFormValid,
    handleChange,
    resetForm,
  } = useFormValidation();

  useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsFormValid(true);
  }, [isOpen, currentUser, setIsFormValid, resetForm, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name='edit-form'
      title='Редактировать профиль'
      isPopup={true}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isSaving={isSaving}
      buttonValues={{ isSaving: 'Сохранение...', default: 'Сохранить' }}
    >
      <Input
        name='name'
        placeholder='Имя'
        type='text'
        isPopup={true}
        minLength='2'
        maxLength='40'
        required={true}
        onChange={handleChange}
        value={values.name || ''}
        error={errors.name || ''}
      />
      <Input
        name='about'
        placeholder='О себе'
        type='text'
        isPopup={true}
        minLength='2'
        maxLength='200'
        required={true}
        onChange={handleChange}
        value={values.about || ''}
        error={errors.about || ''}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
