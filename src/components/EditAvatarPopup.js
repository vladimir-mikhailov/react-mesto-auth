import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import Input from './Input';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSaving }) {
  const {
    errors,
    values,
    isFormValid,
    handleChange,
    resetForm,
  } = useFormValidation();
  useEffect(() => resetForm(), [resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
    resetForm();
  }

  return (
    <PopupWithForm
      name='update-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      isPopup={true}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isSaving={isSaving}
      buttonValues={{ isSaving: 'Сохранение...', default: 'Сохранить' }}
    >
      <Input
        type='url'
        name='avatar'
        isPopup={true}
        placeholder='Ссылка на изображение'
        required
        onChange={handleChange}
        value={values.avatar || ''}
        error={errors.avatar || ''}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
