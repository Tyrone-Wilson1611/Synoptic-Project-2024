import { manualAddPhoneNum, getallPhoneNums } from './database.mjs';
import { messageFunction, singleMessageFunction } from './message.mjs';
import { checks, isCurrentWeatherSevere, getThreeHourlyWeatherData, getDailyWeatherData } from './Weather.mjs';

manualAddPhoneNum('447401105231');
manualAddPhoneNum('61411111111');


const dayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=4&appid=331e13a2241a062eec05fdd320fad13b&units=metric";
const severeWeatherCheckURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=1&appid=331e13a2241a062eec05fdd320fad13b&units=metric";

async function getweatherthreehourlyandsendmessagetosingle() {
    const weatherData = await getThreeHourlyWeatherData(severeWeatherCheckURL);
    if (isCurrentWeatherSevere(weatherData)) {
         singleMessageFunction(weatherData);
    }
}

async function getweatherdailyandsendmessagetosingle() {
    const weatherData = await getDailyWeatherData(dayForecastURL);
    singleMessageFunction(weatherData);
}

async function getweatherthreehourlyandsendmessagetoall() {
    const allNums = await getallPhoneNums();
    console.log('All phone numbers (three hourly):', allNums);
    const weatherData = await getThreeHourlyWeatherData(severeWeatherCheckURL);
    if (isCurrentWeatherSevere(weatherData)) {
         messageFunction(weatherData, allNums);
    }
}

async function getweatherdailyandsendmessagetoall() {
    const allNums = await getallPhoneNums();
    console.log('All phone numbers (daily):', allNums);
    const weatherData = await getDailyWeatherData(dayForecastURL);
    if (weatherData != null) {
        const message = checks(weatherData);
        messageFunction(message, allNums);
    }
}

getweatherdailyandsendmessagetoall();
// getweatherthreehourlyandsendmessagetosingle();
// getweatherdailyandsendmessagetosingle();
// getweatherthreehourlyandsendmessagetoall();
