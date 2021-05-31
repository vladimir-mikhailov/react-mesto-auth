const translateError = error => {
  switch (error) {
    case 'Incorrect email address or password':
      return 'Неправильный Email или пароль.';
    default:
      return error;
  }
};

export default translateError;
