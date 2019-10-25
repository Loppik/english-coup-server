const Word = require('../../../schemes/word');

exports.addWord = word => Word.create(word);

exports.getWordByOriginal = original => Word.findOne({ where: { original } });
exports.getWordsByOriginal = original => Word.findAll({ where: { original } });
exports.getCustomWordsByOriginal = original => Word.findAll({ where: { original, custom: true } });
exports.getNotCustomWordsByOriginal = original => Word.findAll({ where: { original, custom: false } });
exports.getWordById = wordId => Word.findOne({ where: { wordId } });
