const Input = ({
  type,
  name,
  placeholder,
  isPopup,
  minLength,
  maxLength,
  required,
  onChange,
  value,
  error,
}) => {
  return (
    <>
      <input
        type={type}
        className={`form__input${isPopup ? ' form__input_popup' : ''}`}
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        onChange={onChange}
        value={value}
      />
      <span
        className={`form__input-error${
          error === '' ? '' : ' form__input-error_visible'
        }`}
      >
        {error}
      </span>
    </>
  );
};

export default Input;
