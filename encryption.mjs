// using crypto.js package. code examples can be foud at https://github.com/brix/crypto-js#400 under AES encryption
import CryptoJS from "crypto-js";

const testphonenum = '07846577528';
const ourkey = 'CGb8xI0WZmKYgF97clyR7OMK3CEOuayi'

var EPN = CryptoJS.AES.encrypt(testphonenum,ourkey).toString();
var bytes  = CryptoJS.AES.decrypt(EPN, ourkey);
var DPN = bytes.toString(CryptoJS.enc.Utf8);

console.log(EPN)
console.log(DPN); 

