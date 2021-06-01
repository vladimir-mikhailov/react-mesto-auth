import Form from './Form';
import Popup from './Popup';

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

  return (
    <Popup onClose={onClose} isOpen={isOpen} type='form'>
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
    </Popup>
  );
}

export default PopupWithForm;
