const AES = require('crypto-js/aes');
const Utf8 = require('crypto-js/enc-utf8');

module.exports = {

  encrypt({ message, key }) {
    return AES.encrypt(message, key).toString();
  },

  decrypt({ ciphertext, key }) {
    return AES.decrypt(ciphertext, key).toString(Utf8);
  }

}
