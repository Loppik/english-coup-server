const userwordRequest = require('../db/userword-db');
const userwordService = require('../services/userword-service');

exports.addUserword = async (req, res) => {
  try {
    await userwordService.addUserWord({ ...req.body.word, userId: req.body.userId });
    res.send({});
  } catch (err) {
    console.log(err);
    res.status(500).send(err); // FIXME: not reading error description
  }
}

exports.getPortionLearningWords = async (req, res) => {
  try {
    const portionLearningWords = await userwordService.getPortionLearningWords(req.body.userId);
    res.send(portionLearningWords);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
}

exports.changeStatusToLearned = async (req, res) => {
  try {
    const userId = req.body.userId;
    delete req.body.userId;
    await userwordService.changeStatusToLearned(userId, req.body);
    res.send([]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
}

exports.repeatWordsForAllTime = async (req, res) => {
  try {
    const portionLearnedWords = await userwordService.getRepeatWords(req.body.userId, req.query);
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

exports.countAllLearnedWords = async (req, res) => {
  try {
    const allLearnedWords = await userwordRequest.getLearnedWords(req.body.userId);
    res.send(allLearnedWords.length + '');
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
}

