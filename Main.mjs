import {insertphonenum, getallPhoneNums } from './database.mjs';
import {messageFunction, singleMessageFunction } from './message.mjs';
import {severeWeatherCheck, dailyWeatherChecks, getWeatherData} from './Weather.mjs';

const DailyWeatherName = 'WeatherUPD'
const SevereWeatherName = 'WeatherALRT'


//Weather and message function calling
async function severeMessageToSingle() {
    const weatherData = await getWeatherData();
    if (severeWeatherCheck(weatherData) != null && weatherData!= null) {
        const message = severeWeatherCheck(weatherData);
        singleMessageFunction(message, SevereWeatherName);
    }
}

async function dailyMessageToSingle() {
    const weatherData = await  getWeatherData();
    if (weatherData != null) {
        const message = dailyWeatherChecks(weatherData);
        singleMessageFunction(message, DailyWeatherName);
    }
}


async function severeMessageToAll() {
    try {
        const allNums = await getallPhoneNums();
        const weatherData = await getWeatherData();
        if (weatherData != null) {
            const severeWeatherMessage = severeWeatherCheck(weatherData);
            if (severeWeatherMessage != null) {
                messageFunction(severeWeatherMessage, allNums, SevereWeatherName);
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
            messageFunction(dailyMessage, allNums, DailyWeatherName);
        }
    } catch (error) {
        console.error("Error sending daily weather message:", error);
    }
}



insertphonenum('447401105231');
//insertphonenum('447939105014');
//insertphonenum('447592797548');



dailyMessageToAll();
//console.log(getallPhoneNums());
// getweatherthreehourlyandsendmessagetosingle();
// getweatherdailyandsendmessagetosingle();
// getweatherthreehourlyandsendmessagetoall();


// every 3 hours run this code.
//setInterval(getweatherthreehourlyandsendmessagetoall(), 1000*60*60 *3)
