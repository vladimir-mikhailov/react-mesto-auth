function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  isFormValid,
  isSaving,
  buttonValues,
}) {
  function handleClickOnOverlay(evt) {
    evt.target === evt.currentTarget && onClose();
  }

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
        <form
          className={`form ${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className='form__title'>{title}</h2>
          {children}
          <button
            className={`form__button${
              isFormValid ? '' : ' form__button_disabled'
            }`}
            type='submit'
            aria-label={buttonValues.default}
            name={name}
            disabled={!isFormValid}
          >
            {isSaving ? buttonValues.isSaving : buttonValues.default}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
