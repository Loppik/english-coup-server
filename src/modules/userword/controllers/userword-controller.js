const userwordRequest = require('../db/userword-db');
const userWordService = require('../services/userword-service');

exports.addUserWord = async (req, res) => {
  try {
    const r = await userWordService.addUserWord({ ...req.body.word, user_id: req.body.userId });
    res.send({});
  } catch (err) {
    console.log(err);
    res.status(500).send(err); // FIXME: not reading error description
  }
}

exports.getPortionLearningWords = async (req, res) => {
  try {
    const portionLearningWords = await userWordService.getPortionLearningWords(req.body.userId);
    res.send(portionLearningWords);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
}

exports.changeStatusToLearned = async (req, res) => {
  try {
    const userId = req.body.userId; // FIXME: req.body.user_id
    delete req.body.userId;
    await userWordService.changeStatusToLearned(userId, req.body);
    res.send([]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
}

exports.repeatWordsForAllTime = async (req, res) => {
  try {
    const portionLearnedWords = await userWordService.getRepeatWords(req.body.userId, req.query);
    res.send(portionLearnedWords);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
}

exports.countWordsLeft = async (req, res) => {
  try {
    const wordsLeft = await userwordRequest.getLearningWords(req.body.userId);
    res.send(wordsLeft.length + '');
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message });
  }
}

