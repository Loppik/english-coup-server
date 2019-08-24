const userWordRequest = require('../db/userword-db');
const wordRequest = require('../../word/db/word-db');

// FIXME: check situation when user already have this word for learning
exports.addUserWord = async (userword) => {
  if (userword.custom) {
    const words = await wordRequest.getWordByOriginal(userword.original); // FIXME: when translate return to client id of the word, if client don't customize translation then use this id
    const customWord = words.filter((w) => w.translation === userword.translation);
    let wordId;
    if (customWord.length === 0) { // word is custom and it's no in the database
      const w = await wordRequest.addWord({original: userword.original, translation: userword.translation, custom: userword.custom}); // FIXME: replace creating object in separate place
      wordId = w.wordId;
    } else { // word is custom and it's in the database
      wordId = customWord[0].wordId;
    }
    return userWordRequest.addUserWord(userword.userId, wordId);
  } else {
    const words = await wordRequest.getWordByOriginal(userword.original);
    const w = words.filter((w) => w.custom === false);
    let wordId;
    if (w.length === 0) { // word is not custom and it's not in the database
      const w = await wordRequest.addWord({original: userword.original, translation: userword.translation, custom: userword.custom}); // FIXME: replace creating object in separate place
      wordId = w.wordId;
    } else { // word is not custom and it's in the database
      wordId = w[0].wordId;
    }
    return userWordRequest.addUserWord(userword.userId, wordId);
  }
}

const getRandomInt = max => {
  return Math.floor(Math.random()*max);
}

const translatePortionWordsFromUserwords = async (userwords, needWordsCount) => {
  const portionWords = [];
  for (let i = 0; i < needWordsCount; i++) {
    const randIndex = getRandomInt(userwords.length);
    const userword = userwords[randIndex];
    userwords.splice(randIndex, 1);
    const word = await wordRequest.getWordById(userword.wordId)
    word.watched = false;
    portionWords.push(word);
  }
  return portionWords;
}

const fromUserwordsToWords = async (userwords) => {
  let r = [];
  for(let i = 0; i < userwords.length; i++) {
    const word = await wordRequest.getWordById(userwords[i].wordId)
    r.push(word);     
  }
  return r;
}

exports.getPortionLearningWords = async userId => {
  let allLearningWords = await userWordRequest.getLearningWords(userId);
  const count = 5; // FIXME: go to user settings and see this parametr
  if (allLearningWords.length === count) return await fromUserwordsToWords(allLearningWords);
  if (allLearningWords.length > count) return await translatePortionWordsFromUserwords(allLearningWords, count);
  return [];
}

exports.changeStatusToLearned = async (userId, words) => {
  for(let i = 0; i < words.length; i++) {
    await userWordRequest.setLearnedStatus(userId, words[i].wordId);
  }
}

exports.getRepeatWords = async (userId, filter) => {
  const count = 5; // FIXME: go to user settings and see this parametr
  
  const allLearnedWords = await userWordRequest.getLearnedWords(userId);
  if (allLearnedWords.length === count) return await fromUserwordsToWords(allLearnedWords);
  if (allLearnedWords.length > count) return await translatePortionWordsFromUserwords(allLearnedWords, count);
  return [];
  
}