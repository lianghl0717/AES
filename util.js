var CryptoJS = require('AES.js');//这里的路径是你放AES.js的路径，我放在同一个目录下了
var util = require('base64.js');
var key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");//密钥
var iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');//偏移iv
// AES加密
function Encrypt(word) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

  return encrypted.ciphertext.toString().toUpperCase();
  //toString()  转字符串   toUpperCase()  转换成大写（可以不使用转大写）
}
// AES解密
function Decrypt(word) {
  var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
// 暴露接口
module.exports = {
  Encrypt: Encrypt,
  Decrypt: Decrypt,
}
