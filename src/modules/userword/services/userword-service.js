const userWordRequest = require('../db/userword-db');
const wordRequest = require('../../word/db/word-db');

// FIXME: check situation when user already have this word for learning
exports.addUserWord = async (user_id, word) => {
  if (word.custom) {
    const words = await wordRequest.getWordByOriginal(word.original); // FIXME: when translate return to client id of the word, if client don't customize translation then use this id
    const customWord = words.filter((w) => w.translation === word.translation);
    let word_id;
    if (customWord.length === 0) { // word is custom and it's no in the database
      const w = await wordRequest.addWord({original: word.original, translation: word.translation, custom: word.custom}); // FIXME: replace creating object in separate place
      word_id = w.word_id;
    } else { // word is custom and it's in the database
      word_id = customWord[0].word_id;
    }
    return userWordRequest.addUserWord(user_id, word_id);
  } else {
    const words = await wordRequest.getWordByOriginal(word.original);
    const w = words.filter((w) => w.custom === false);
    let word_id;
    if (w.length === 0) { // word is not custom and it's not in the database
      const w = await wordRequest.addWord({original: word.original, translation: word.translation, custom: word.custom}); // FIXME: replace creating object in separate place
      word_id = w.word_id;
    } else { // word is not custom and it's in the database
      word_id = w[0].word_id;
    }
    return userWordRequest.addUserWord(user_id, word_id);
  }
}

const getRandomInt = max => {
  return Math.floor(Math.random()*max);
}

const getPortionWordsFromUserwords = async (userwords, needWordsCount) => {
  const portionWords = [];
  for (let i = 0; i < count; i++) {
    const randIndex = getRandomInt(userwords.length);
    const userword = userwords[randIndex];
    userwords.splice(randIndex, 1);
    const word = await wordRequest.getWordById(userword.word_id)
    word.watched = false;
    portionWords.push(word);
  }
  return portionWords;
}

const fromUserwordsToWords = async (userwords) => {
  let r = [];
  for(let i = 0; i < userwords.length; i++) {
    const word = await wordRequest.getWordById(userwords[i].word_id)
    r.push(word);     
  }
  return r;
}

exports.getPortionLearningWords = async user_id => {
  let allLearningWords = await userWordRequest.getLearningWords(user_id);
  const count = 5; // FIXME: go to user settings and see this parametr
  if (allLearningWords.length === count) return await fromUserwordsToWords(allLearningWords);
  if (allLearningWords.length > count) return await getPortionWordsFromUserwords(allLearningWords, count);
  return [];
}

exports.changeStatusToLearned = async (user_id, words) => {
  for(let i = 0; i < words.length; i++) {
    await userWordRequest.setLearnedStatus(user_id, words[i].word_id);
  }
}

exports.getRepeatWords = async (user_id, filter) => {
  const count = 5; // FIXME: go to user settings and see this parametr
  console.log(filter.type)
  switch (filter.type) {
    case 'forAllTime':
      const allLearnedWords = await userWordRequest.getLearnedWords(user_id);
      if (allLearnedWords.length === count) return await fromUserwordsToWords(allLearnedWords);
      if (allLearnedWords.length > count) return await getPortionWordsFromUserwords(allLearnedWords, count);
      return [];
  }
}