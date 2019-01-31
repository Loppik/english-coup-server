const translationRequest = require('../db/translation-db');

exports.translateWord = async original => {
  let word = await translationRequest.getWordByOriginal(original);
  if (word.length === 0) {
    
  }
  return word;
}