//whoever makes database needs to put there info into connect variable, if confused look here https://node-postgres.com/apis/client 
import pg from 'pg';
import { encryptPhoneNumber, getKey} from './encryption.mjs';
import { encode } from 'querystring';

// Database connection setup
// const client = new pg.Client({
//     user: '',
//     password: '',
//     host: '',
//     port: '',
//     database: '',
// });

// client.connect(err => {
//     if (err) {
//         console.error('error', err);
//     }
// });

var allPhoneNums = [];

export async function getallPhoneNums() {
    return allPhoneNums;
}

export function insertphonenum(phoneNumber) {
    var encryptedPhoneNumber = encryptPhoneNumber(phoneNumber, getKey());
    if (!allPhoneNums.includes(encryptedPhoneNumber)) { 
        allPhoneNums.push(encryptedPhoneNumber);
        console.log('Phone number added');
    } else {
        console.log('Phone number exists');
    }
}

// export async function insertPerson(name, phoneNumber) {
//     const encryptedPhoneNumber = encryptPhoneNumber(phoneNumber);
//     if (!allPhoneNums.includes(phoneNumber)) { 
//         allPhoneNums.push(phoneNumber);
//         const query = 'INSERT INTO person (name, phonenumber) VALUES ($1, $2)';
//         const info = [name, encryptedPhoneNumber];
//         await client.query(query, info);
//     } else {
//         console.log('Phone number exists');
//     }
// }

