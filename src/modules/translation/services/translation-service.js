const axios = require('axios');
const wordRequest = require('../../word/db/word-db');
const wordService = require('../../word/services/word-service');

exports.translateWord = async original => {
  let words;
  if( await wordService.isExistWordInDatabaseByOriginal(original) ) {
    words = await wordRequest.getWordByOriginal(original);
  } else {
    const response = await axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?text=${original}&lang=en-ru&key=trnsl.1.1.20190128T172438Z.27f4b4aa20d2af72.610b87c2c6c2d722e38f49da5ca8d1a34cbadce9`);
    const word = response.data.text[0];
    words = [{original: original, translation: word, custom: false}];
  }
  return words;
}