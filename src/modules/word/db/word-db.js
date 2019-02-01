const Word = require('../../../schemes/words');

exports.addWord = word => Word.query().insert(word);