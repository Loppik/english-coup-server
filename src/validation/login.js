const { isInvalidEmail, isInvalidPassword } = require('./fields');

const areLoginObjectFieldsUnavailable = (data) => {
  if (!data.hasOwnProperty('email')) {
    return 'no email field';
  }
  if (!data.hasOwnProperty('password')) {
    return 'no password field';
  }
  return false;
}

exports.isInvalidLoginData = (data) => {
  return new Promise((resp, rej) => {
    let err = areLoginObjectFieldsUnavailable(data);
    if (err) rej(err);

    err = isInvalidEmail(data.email);
    if (err) rej(err);

    err = isInvalidPassword(data.password);
    if (err) rej(err);

    return resp(false);
  })
}

