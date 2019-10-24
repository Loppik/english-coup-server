const Word = require('../../../schemes/word');

exports.addWord = word => Word.create(word);
exports.getWordByOriginal = original => Word.findOne({ where: { original } });
exports.getWordById = wordId => Word.findOne({ where: { wordId } });
