export default (values) => {
  const errors = {};

  if (!values.username || !values.username.trim()) {
    errors.username = 'Username can\'t be empty.';
  } else if (values.username.length > 15) {
    errors.username = 'Username must be 15 characters or less';
  }

  if (!values.password || !values.password.trim()) {
    errors.password = 'Password can\'t be empty.';
  }

  return errors
};
