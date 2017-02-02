export default (values) => {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = 'This field can\'t be empty.';
  } else if (values.title.length > 15) {
    errors.title = 'Title must be 15 characters or less';
  }

  if (values.description && values.description.trim() && values.description.length > 150) {
    errors.description = 'Description must be 150 characters or less';
  }

  return errors
};
