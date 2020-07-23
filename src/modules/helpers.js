const getRandomInt = max => {
  return Math.floor(Math.random()*max);
};

const shuffleArray = (arr) => {
  const shuffledArr = [];
  while(arr.length) {
    const removedArrElement = arr.splice(getRandomInt(arr.length), 1);
    shuffledArr.push(removedArrElement[0]);
  }
  return shuffledArr;
};

module.exports = {
  getRandomInt,
  shuffleArray
};
