import { useEffect } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';
import Input from './Input';
import { useFormValidation } from './useFormValidation';

const Register = ({ handleRegister, isSaving, isPopup }) => {
  const {
    values,
    errors,
    isFormValid,
    handleChange,
    resetForm,
  } = useFormValidation();
  useEffect(() => resetForm(), [resetForm]);

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = values;
    handleRegister({ email, password });
    resetForm();
  };

  return (
    <main className='main section section_centered form__container'>
      <Form
        title='Регистрация'
        name='register'
        isPopup={isPopup}
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        isSaving={isSaving}
        buttonValues={{
          isSaving: 'Регистрация...',
          default: 'Зарегистрироваться',
        }}
      >
        <Input
          name='email'
          placeholder='Email'
          type='email'
          isPopup={isPopup}
          minLength='2'
          maxLength='40'
          required={true}
          onChange={handleChange}
          value={values.email || ''}
          error={errors.email || ''}
        />
        <Input
          name='password'
          placeholder='Пароль'
          type='password'
          isPopup={isPopup}
          minLength='6'
          maxLength='40'
          required={true}
          onChange={handleChange}
          value={values.password || ''}
          error={errors.password || ''}
        />
      </Form>
      <span className='form__bottom-text'>
        Уже зарегистрированы?{' '}
        <Link to='/sign-in' className='form__bottom-link'>
          Войти
        </Link>
      </span>
    </main>
  );
};

export default Register;
