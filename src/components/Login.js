import { useFormValidation } from './useFormValidation';
import Form from './Form';
import Input from './Input';
import { useEffect } from 'react';

const Login = ({ handleLogin, isSaving, isPopup }) => {
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
    handleLogin({ email, password });
  };

  return (
    <main className='main section section_centered form__container'>
      <Form
        title='Вход'
        name='login'
        isPopup={isPopup}
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        isSaving={isSaving}
        buttonValues={{ isSaving: 'Вход...', default: 'Войти' }}
      >
        <Input
          name='email'
          placeholder='Email'
          type='email'
          isPopup={isPopup}
          minLength='1'
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
          minLength='1'
          maxLength='40'
          required={true}
          onChange={handleChange}
          value={values.password || ''}
          error={errors.password || ''}
        />
      </Form>
    </main>
  );
};

export default Login;
