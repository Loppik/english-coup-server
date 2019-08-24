const Word = require('../../../schemes/words');

exports.addWord = word => Word.query().insert(word);
exports.getWordByOriginal = original => Word.query().where('original', original);
exports.getWordById = wordId => Word.query().where('wordId', wordId).first();