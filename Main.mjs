
import {messageFunction, singleMessageFunction} from './message.mjs'
import {isCurrentWeatherSevere, getThreeHourlyWeatherData, getDailyWeatherData} from './Weather.mjs'


//weather messsaging functions
const dayForescastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=4&appid=331e13a2241a062eec05fdd320fad13b&units=metric";
const severeWeatherCheckURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=1&appid=331e13a2241a062eec05fdd320fad13b&units=metric";

function getweatherthreehourlyandsendmessagetosingle(){
    getThreeHourlyWeatherData(severeWeatherCheckURL);
    if(isCurrentWeatherSevere){
        singleMessageFunction(getThreeHourlyWeatherData);
    }
}
function getweatherdailyandsendmessagetosingle(){
    getDailyWeatherData(dayForescastURL);
    singleMessageFunction(getDailyWeatherData)
}

function getweatherthreehourlyandsendmessagetoall(){
    getThreeHourlyWeatherData(severeWeatherCheckURL);
    if(isCurrentWeatherSevere){
        messageFunction(getThreeHourlyWeatherData) ; 
    }
}
function getweatherdailyandsendmessagetoall(){
    getDailyWeatherData(dayForescastURL);
    messageFunction(getDailyWeatherData)
}

getweatherthreehourlyandsendmessagetosingle()
getweatherdailyandsendmessagetosingle()


//setInterval(() => getweatherthreehourlyandsendmessagetosingle(), 1000 * 60 * 60 * 3);
//setInterval(() => getweatherdailyandsendmessagetosingle(), 1000 * 60 * 60 * 24);
