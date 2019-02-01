const axios = require('axios');
const translationRequest = require('../db/translation-db');
const wordRequest = require('../../word/db/word-db');

const isExistWordInDatabase = word => translationRequest.getWordByOriginal(word).then((words) => words.length != 0);

exports.translateWord = async original => {
  let words;
  if( await isExistWordInDatabase(original) ) {
    words = await translationRequest.getWordByOriginal(original);
  } else {
    const response = await axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?text=${original}&lang=en-ru&key=trnsl.1.1.20190128T172438Z.27f4b4aa20d2af72.610b87c2c6c2d722e38f49da5ca8d1a34cbadce9`);
    const word = response.data.text[0];
    words = [await wordRequest.addWord({original: original, translation: word, custom: false})];
  }
  return words;
}