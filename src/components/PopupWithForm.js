import Form from './Form';
import { HandleClickOnOverlayContext } from '../contexts/HandleClickOnOverlayContext';
import { useContext } from 'react';

function PopupWithForm({
  title,
  name,
  isPopup,
  isOpen,
  onClose,
  onSubmit,
  children,
  isFormValid,
  isSaving,
  buttonValues,
}) {
  const handleClickOnOverlay = useContext(HandleClickOnOverlayContext);

  return (
    <div
      className={`popup popup_type_${name}${isOpen ? ' popup_open' : ''}`}
      onClick={handleClickOnOverlay}
    >
      <div className='popup__container popup__container_type_form'>
        <button
          className='popup__button-close'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        />
        <Form
          title={title}
          name={name}
          isPopup={isPopup}
          onSubmit={onSubmit}
          isFormValid={isFormValid}
          isSaving={isSaving}
          buttonValues={buttonValues}
        >
          {children}
        </Form>
      </div>
    </div>
  );
}

export default PopupWithForm;
