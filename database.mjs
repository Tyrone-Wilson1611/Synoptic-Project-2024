//whoever makes database needs to put there info into connect variable, if confused look here https://node-postgres.com/apis/client 
import pg from 'pg';
import { encryptPhoneNumber, decryptPhoneNumber, getPhone } from './encryption.mjs';

// Database connection setup
const client = new pg.Client({
    user: '',
    password: '',
    host: '',
    port: '',
    database: '',
});

client.connect(err => {
    if (err) {
        console.error('error', err);
    }
});

//could make this an ID select, or just get any
async function getallPhoneNums() {
    var allPhoneNums = [];
    const res = await client.query('SELECT PhoneNumber FROM person');
    res.rows.forEach(row => {
        const decryptedPhoneNumber = decryptPhoneNumber(row.phonenumber);
        allPhoneNums.push(decryptPhoneNumber);
    });
    return allPhoneNums;

}

async function insertPerson(name, phoneNumber) {
    const encryptedPhoneNumber = encryptPhoneNumber(phoneNumber);
    const query = 'insert;;
    const info = [name, encryptedPhoneNumber];
    await client.query(query, info);
}
