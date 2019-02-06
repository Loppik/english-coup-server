const wordRequest = require('../db/word-db');

exports.isExistWordInDatabaseByOriginal = original => wordRequest.getWordByOriginal(original).then((words) => words.length != 0);