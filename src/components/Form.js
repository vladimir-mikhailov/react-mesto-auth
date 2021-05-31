const Form = ({
  title,
  name,
  onSubmit,
  children,
  isFormValid,
  isSaving,
  buttonValues,
  isPopup
}) => {
  return (
    <form
      className={`form${isPopup ? ' form_popup' : ''}`}
      name={name}
      onSubmit={onSubmit}
      noValidate
    >
      <h2
        className={`form__title${isPopup ? ' form__title_popup' : ''}`}
      >
        {title}
      </h2>
      {children}
      <button
        className={`form__button${isPopup?' form__button_popup':''}${(isFormValid) ? '' : isPopup ? ' form__button_disabled' : ''}`}
        type='submit'
        aria-label={buttonValues.default}
        name={name}
        disabled={!isFormValid}
      >
        {isSaving ? buttonValues.isSaving : buttonValues.default}
      </button>
    </form>
  )
}

export default Form
