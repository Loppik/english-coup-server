const wordRequest = require('../db/word-db');

exports.isExistWordInDatabaseByOriginal = original => wordRequest.getWordByOriginal(original).then((word) => Boolean(word));
