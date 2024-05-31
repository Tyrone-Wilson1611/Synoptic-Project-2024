// using crypto.js package. code examples can be foud at https://github.com/brix/crypto-js#400 under AES encryption
import CryptoJS from "crypto-js";

function encryptPhoneNumber(pn, key) {
    return CryptoJS.AES.encrypt(pn, key).toString();
}

function decryptPhoneNumber(epn, key) {
    var bytes  = CryptoJS.AES.decrypt(epn , key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Test data
const testPhoneNumber = '07846577528';
const ourKey = 'CGb8xI0WZmKYgF97clyR7OMK3CEOuayi';

const ecntest = encryptPhoneNumber(testPhoneNumber, ourKey);
console.log("Encrypted phone number:", ecntest);

const dectest = decryptPhoneNumber(ecntest, ourKey);
console.log("Decrypted phone number:", dectest);

