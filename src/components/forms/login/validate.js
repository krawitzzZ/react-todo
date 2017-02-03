export default (values) => {
  const errors = {};

  if (!values.username || !values.username.trim()) {
    errors.username = 'Username can\'t be empty';
  }

  if (!values.password || !values.password.trim()) {
    errors.password = 'Password can\'t be empty';
  }

  return errors
};
