export default (values) => {
  const errors = {};

  if (!values.username || !values.username.trim()) {
    errors.username = 'Username can\'t be empty';
  } else if (values.username.length > 15) {
    errors.username = 'Username must be 15 characters or less';
  } else if (values.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
    errors.email = 'Invalid email address'
  }

  if (!values.password || !values.password.trim()) {
    errors.password = 'Password can\'t be empty';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters';
  }

  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Passwords should match';
  }

  return errors
};
