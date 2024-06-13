//whoever makes database needs to put there info into connect variable, if confused look here https://node-postgres.com/apis/client 
import pg from 'pg';
import { encryptPhoneNumber, ourKey} from './encryption.mjs';


var allPhoneNums = [];


// const client = new pg.Client({
//     user: 'fbh23equ',
//     password: 'ByGentlemanShoe49*',
//     host: 'cmpstudb-01.cmp.uea.ac.uk',
//     port: '5432',
//     database: 'fbh23equ',
//     connectionTimeoutMillis: 5000 
// });


// async function connectAndSetSchema() {
//     try {
//         await client.connect();
//         console.log('Connected to the database');
//         await client.query('SET search_path TO project, public;');
//         console.log('Search path set to project schema');
//     } catch (err) {
//         console.error('Connection error:', err.stack);
//     }
// }
// connectAndSetSchema();

export async function getallPhoneNumsFromDatabase() {
    const res = await client.query('SELECT "PhoneNumber" FROM "Users"');
    allPhoneNums  = res.rows.map(row => row.PhoneNumber);
    return allPhoneNums;
    }


export function insertphonenum(phoneNumber) {
    var encryptedPhoneNumber = encryptPhoneNumber(phoneNumber, ourKey);
    if (!allPhoneNums.includes(encryptedPhoneNumber)) { 
        allPhoneNums.push(encryptedPhoneNumber);
        console.log('Phone number added');
    } else {
        console.log('Phone number exists');
    }
}


export async function insertUser(id, name, phoneNumber, address, signUpdDate) {
    const encryptedPhoneNumber = encryptPhoneNumber(phoneNumber);
    if (!allPhoneNums.includes(encryptedPhoneNumber)) { 
        allPhoneNums.push(encryptedPhoneNumber);
        const query = 'insert person (id, name, encryptedPhoneNumber, address, signup-date) VALUES ($1, $2, $3, $4, $5)';
        const info = [id, name, encryptedPhoneNumber, address, signUpdDate];
        await client.query(query, info);
    } else {
        console.log('Phone number exists');
    }
}



export async function insertWeatherCondition(conditionID, conditionType, description) {
    const query = 'INSERT INTO "WeatherConditions" ("ConditionID", "ConditionType", "Description") VALUES ($1, $2, $3)';
    const info = [conditionID, conditionType, description];
    try {
        await client.query(query, info);
        console.log('Weather condition inserted');
    } catch (err) {
        console.error('Insert error:', err.stack);
    }
}



export async function insertAlert(alertID, conditionID, alertMessage) {
    const query = 'INSERT INTO Alerts (alertID, ConditionID, AlertMessage) VALUES ($1, $2, $3)';
    const info = [alertID, conditionID, alertMessage];
    try{
         await client.query(query, info);
        console.log('Alert inserted');
    }
    catch(err){
        console.log(err);
    }
}

export async function insertUserAlert(userID, alertID) {
    const query = 'INSERT INTO UserAlerts (UserID, AlertID) VALUES ($1, $2)';
    const info = [userID, alertID];
    await client.query(query, info);
    console.log('User alert inserted');
}

export async function insertWeatherStation(stationName, location) {
    const query = 'INSERT INTO WeatherStations (StationName, Location) VALUES ($1, $2)';
    const info = [stationName, location];
    await client.query(query, info);
    console.log('Weather station inserted');
}

export async function insertWeatherData(stationID, conditionID, temperature, rain, windSpeed) {
    const query = 'INSERT INTO WeatherData (StationID, ConditionID, Temperature, rain, WindSpeed) VALUES ($1, $2, $3, $4, $5)';
    const info = [stationID, conditionID, temperature, rain, windSpeed];
    await client.query(query, info);
    console.log('Weather data inserted');
}

export async function getallPhoneNums() {
    return allPhoneNums;
}
