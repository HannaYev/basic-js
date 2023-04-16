const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit( n ) {
  const resultsArr = [];
  const nStr = n.toString();
  

  for (let i = 0; i < nStr.length; i++) {
    resultsArr.push(nStr.slice(0, i) + nStr.slice(i + 1));
  }

  const numResults = resultsArr.map((item) => +item);

  return Math.max(...numResults);
}


module.exports = {
  deleteDigit
};
