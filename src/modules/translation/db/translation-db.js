const Words = require('../../../schemes/words');

exports.getWordByOriginal = original => Words.query().where('original', '=', original);