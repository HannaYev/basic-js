const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = [];
    for (let i = 65; i < 91; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
  }

  encrypt(mes, key) {
    if (mes === undefined || key === undefined) {
      throw new Error("Incorrect arguments!");
    }

    mes = mes.toUpperCase();
    key = key.toUpperCase();
    let MessageIndex = [];
    let keyInd = [];

    for (let i = 0; i < mes.length; i++) {
      if (!this.alphabet.includes(mes[i])) {
        MessageIndex.push(mes[i]);
      } else {
        MessageIndex.push(this.alphabet.indexOf(mes[i]));
      }
    }

    for (let i = 0; i < key.length; i++) {
      if (this.alphabet.includes(key[i])) {
        keyInd.push(this.alphabet.indexOf(key[i]));
      }
    }

    let index = 0;

    for (let i = 0; i < MessageIndex.length; i++) {
      if (typeof MessageIndex[i] === "number") {
        MessageIndex[i] += keyInd[index];
        if (MessageIndex[i] > 25) {
          MessageIndex[i] = this.alphabet[MessageIndex[i] - 26];
        } else {
          MessageIndex[i] = this.alphabet[MessageIndex[i]];
        }
        index++;
        if (index === keyInd.length) {
          index = 0;
        }
      }
    }

    return this.direct ? MessageIndex.join("") : MessageIndex.reverse().join("");
  }

  decrypt(encMessage, key) {
    if (encMessage === undefined || key === undefined) {
      throw new Error("Incorrect arguments!");
    }

    encMessage = encMessage.toUpperCase();
    key = key.toUpperCase();
    let MessageIndex = [];
    let keyInd = [];

    for (let i = 0; i < encMessage.length; i++) {
      if (!this.alphabet.includes(encMessage[i])) {
        MessageIndex.push(encMessage[i]);
      } else {
        MessageIndex.push(this.alphabet.indexOf(encMessage[i]));
      }
    }

    for (let i = 0; i < key.length; i++) {
      if (this.alphabet.includes(key[i])) {
        keyInd.push(this.alphabet.indexOf(key[i]));
      }
    }

    let index = 0;

    for (let i = 0; i < MessageIndex.length; i++) {
      if (typeof MessageIndex[i] === "number") {
        MessageIndex[i] =
          this.alphabet[(MessageIndex[i] - keyInd[index] + 26) % 26];
        index++;
        if (index === keyInd.length) {
          index = 0;
        }
      }
    }

    return this.direct ? MessageIndex.join("") : MessageIndex.reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine
};
