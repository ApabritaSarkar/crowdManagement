const CryptoJS = require('crypto-js');

// Use a secure key for encryption/decryption
const SECRET_KEY = process.env.SECRET_KEY || "your_secure_key";

// Encrypt Data
const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (error) {
    throw new Error('Error encrypting data: ' + error.message);
  }
};

// Decrypt Data
const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    throw new Error('Error decrypting data: ' + error.message);
  }
};

module.exports = { encryptData, decryptData };
