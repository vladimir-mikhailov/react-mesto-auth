import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';
import Input from './Input';
import { useFormValidation } from './useFormValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSaving }) {
  const {
    values,
    errors,
    isFormValid,
    handleChange,
    resetForm,
  } = useFormValidation();
  useEffect(() => resetForm(), [resetForm]);

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name='add-card-form'
      title='Новое место'
      isPopup={true}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isSaving={isSaving}
      buttonValues={{ isSaving: 'Создание...', default: 'Создать' }}
    >
      <Input
        type='text'
        name='name'
        isPopup={true}
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        onChange={handleChange}
        value={values.name || ''}
        error={errors.name || ''}
      />
      <Input
        type='url'
        name='link'
        isPopup={true}
        placeholder='Ссылка на картинку'
        required
        onChange={handleChange}
        value={values.link || ''}
        error={errors.link || ''}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
