const Word = require('../../../schemes/words');

exports.addWord = word => Word.query().insert(word);
exports.getWordByOriginal = original => Words.query().where('original', '=', original);