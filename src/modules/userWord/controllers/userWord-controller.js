const userWordService = require('../services/userWord-service');

exports.addUserWord = async (req, res) => {
  try {
    const res = await userWordService.addUserWord(req.body.user_id, req.body.word);
    res.send({});
  } catch (err) {
    res.status(500);
    res.send(err);
  }
}
