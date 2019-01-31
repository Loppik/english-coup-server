const translationService = require('../services/translation-service');

exports.translateWord = async (req, res) => {
  const word = await translationService.translateWord(req.body.original);
  res.send(word);
}