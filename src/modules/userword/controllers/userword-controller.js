const userWordService = require('../services/userword-service');

exports.addUserWord = async (req, res) => {
  try {
    const r = await userWordService.addUserWord(req.body.user_id, req.body.word);
    res.send({});
  } catch (err) {
    res.status(500);
    res.send(err); // FIXME: not reading error description
  }
}

exports.getPortionLearningWords = async (req, res) => {
  try {
    const user_id = 2; // FIXME: req.body.user_id
    const portionLearningWords = await userWordService.getPortionLearningWords(user_id);
    res.send(portionLearningWords);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
}

exports.changeStatusToLearned = async (req, res) => {
  try {
    const user_id = 2; // FIXME: req.body.user_id
    await userWordService.changeStatusToLearned(user_id, req.body);
    res.send([]);
  } catch (err) {
    console.log(err.message);
    res.status(500);
    res.send(err.message);
  }
}

exports.repeatWordsForAllTime = async (req, res) => {
  try {
    const user_id = 2; // FIXME: req.body.user_id
    console.log(req.query);
    const portionLearnedWords = await userWordService.getRepeatWords(user_id, req.query);
    res.send(portionLearnedWords);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
}

