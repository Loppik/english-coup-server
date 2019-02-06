const Word = require('../../../schemes/words');

exports.addWord = word => Word.query().insert(word);
exports.getWordByOriginal = async original => Word.query().where('original', '=', original);