import {insertphonenum, getallPhoneNums } from './database.mjs';
import {messageFunction, singleMessageFunction } from './message.mjs';
import {severeWeatherCheck, dailyWeatherChecks, getWeatherData} from './Weather.mjs';
import { insertWeatherCondition } from './database.mjs';
const olliepnum = '07401105231';


//Weather and message function calling
async function severeMessageToSingle(phoneNum) {
    try {
        const weatherData = await getWeatherData();
        if (weatherData) {
            const severeMessage = severeWeatherCheck(weatherData);
            if (severeMessage) {
                singleMessageFunction(severeMessage, phoneNum);
            }
        }
    } catch (err) {
        console.error('ERROR sending severe message:', err);
    }
}

async function dailyMessageToSingle(phoneNum) {
    try {
        const weatherData = await getWeatherData();
        if (weatherData) {
            const dailyMessage = dailyWeatherChecks(weatherData);
            singleMessageFunction(dailyMessage, phoneNum);
        }
    } catch (err) {
        console.error('ERROR sending daily message:', err);
    }
}


async function severeMessageToAll() {
    try {
        const allNums = await getallPhoneNums();
        const weatherData = await getWeatherData();
        if (weatherData != null) {
            const severeWeatherMessage = severeWeatherCheck(weatherData);
            if (severeWeatherMessage != null) {
                messageFunction(severeWeatherMessage, allNums);
                console.log(severeWeatherMessage)
            }
        }
    } catch (error) {
        console.error("Error sending severe weather message:", error);
    }
}


async function dailyMessageToAll() {
    try {
        const allNums = await getallPhoneNums();
        const weatherData = await getWeatherData();
        if (weatherData != null) {
            const dailyMessage = dailyWeatherChecks(weatherData);
            console.log(dailyMessage)
            messageFunction(dailyMessage, allNums);
        }
    } catch (error) {
        console.error("Error sending daily weather message:", error);
    }
}

const message4 = 'HIGH WIND WARNING: Dangerously high wind speed expected at: 9:00' ;

singleMessageFunction(message4, '447401105231')
dailyMessageToSingle(olliepnum);
severeMessageToSingle(olliepnum)

//setInterval(dailyMessageToAll, 1000 * 60 * 60 * 24)
//setInterval(severeMessageToAll, 1000 * 60 * 60 * 3)

