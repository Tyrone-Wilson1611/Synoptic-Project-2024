
import {messageFunction, singleMessageFunction} from './message.mjs'
import {getThreeHourlyWeatherData, getDailyWeatherData} from './Weather.mjs'


//weather messsaging functions
const dayForescastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=4&appid=331e13a2241a062eec05fdd320fad13b&units=metric";
const severeWeatherCheckURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=1&appid=331e13a2241a062eec05fdd320fad13b&units=metric";

function getweatherthreehourlyandsendmessagetosingle(){
    getThreeHourlyWeatherData(severeWeatherCheckURL);
    singleMessageFunction(getThreeHourlyWeatherData)
}
function getweatherdailyandsendmessagetosingle(){
    getDailyWeatherData(dayForescastURL);
    singleMessageFunction(getDailyWeatherData)
}

function getweatherthreehourlyandsendmessagetoall(){
    getThreeHourlyWeatherData(severeWeatherCheckURL);
    messageFunction(getThreeHourlyWeatherData)
}
function getweatherdailyandsendmessagetoall(){
    getDailyWeatherData(dayForescastURL);
    messageFunction(getDailyWeatherData)
}



//setInterval(() => getThreeHourlyWeatherData(severeWeatherCheckURL), 1000 * 60 * 60 * 3);
//setInterval(() => getDailyWeatherData(dayForescastURL), 1000 * 60 * 60 * 24);
