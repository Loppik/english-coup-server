const { isInvalidPassword, isInvalidEmail } = require('./fields');

const areRegObjectFieldsUnavailable = (data) => {
  if (!data.hasOwnProperty('email')) {
    return 'no email field';
  }
  if (!data.hasOwnProperty('password')) {
    return 'no password field';
  }
  return false;
}

exports.isInvalidRegData = (data) => {
  return new Promise((resp, rej) => {
    let err = areRegObjectFieldsUnavailable(data);
    if (err) rej(err);

    err = isInvalidEmail(data.email);
    if (err) rej(err);

    err = isInvalidPassword(data.password);
    if (err) rej(err);

    return resp(false);
  });
};