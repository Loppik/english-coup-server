exports.isInvalidPassword = (password) => {
  if (password.length < 3 || password.length > 15) {
    return 'incorrect password length';
  }
  const regexp = /^[a-zA-Z0-9_]*$/
  if (!regexp.test(password)) {
    return 'incorrect symbol in password';
  }
  return false;
}

exports.isInvalidEmail = (email) => {
  const regexp = /@/
  if (!regexp.test(email)) {
    return 'no symbol @';
  }
  return false;
}

