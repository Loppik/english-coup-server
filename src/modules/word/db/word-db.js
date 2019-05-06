const Word = require('../../../schemes/words');

exports.addWord = word => Word.query().insert(word);
exports.getWordByOriginal = original => Word.query().where('original', original);
exports.getWordById = word_id => Word.query().where('word_id', word_id).first();