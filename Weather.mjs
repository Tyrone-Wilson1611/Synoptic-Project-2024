//file that fetchs weather data and returns text/A message based on that data that is returned to us.//
var alertID = 0
import{insertAlert, insertWeatherCondition, insertWeatherData} from './database.mjs'
//Url that consists of data about the weather 
const dayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=4&appid=331e13a2241a062eec05fdd320fad13b&units=metric";


//function to fetch weather data for the next 12 hours
export async function getWeatherData() {
    const response = await fetch(dayForecastURL);
    if(!response.ok) {
        throw new Error(`error: ${response.statusText}`);
    }
    const weatherData = await response.json();
    //console.log(JSON.stringify(weatherData.list, null, 4));
    return weatherData.list;
}


export function dailyWeatherChecks(forecast) {
    var hwindSpeed, htemp, hrainfall;
    var rainMessages = [];
    var time, maxRainTime= '';
    var avgTemp = 0, avgWindSpeed = 0, expectedRainfall = 0, count = 0, maxRainFall = 0;

    forecast.forEach(update => {
        hrainfall = (update.rain && update.rain['3h']) ? update.rain['3h'] : 0; 
        htemp = update.main.temp;
        hwindSpeed = update.wind.speed; 
        avgTemp += htemp;
        avgWindSpeed += hwindSpeed;
        expectedRainfall += hrainfall; 
        // Extract only the time part
        time = update.dt_txt.split(' ')[1];
        //get the hour from time string, convert to int, and add 3 to simulate next time threshold
        let hour = parseInt(time.split(':', 1));
        let endHour = hour + 3;
        if (hrainfall >= 3) {
            rainMessages.push(`${hrainfall} mm between ${hour}:00 - ${endHour}:00`); 
        }
        count++;
    });

    // Calculate averages
    avgTemp /= count;
    avgWindSpeed /= count;
    avgTemp = Math.round(avgTemp);
    avgWindSpeed = Math.round(avgWindSpeed * 10) / 10;
    expectedRainfall = Math.round(expectedRainfall);

    //monsoon rain
    if (expectedRainfall>150){
       // insertWeatherData(1, 1 , avgTemp, expectedRainfall, avgWindSpeed);
    }
    // heatwave
    else if (avgTemp>40){
      //  insertWeatherData(1, 3 , avgTemp, expectedRainfall, avgWindSpeed);
    //typhoon 
    }
    else if(expectedRainfall >= 100 && avgWindSpeed >= 119){
      //  insertWeatherData(1, 6 , avgTemp, expectedRainfall, avgWindSpeed);
    }
    //no rain
    if (rainMessages.length != 0){
         return `Today's weather:\n` +
            `Temperature: ${avgTemp}°C\n` +
            `Wind: ${avgWindSpeed} km/h\n` +
            `Rain: ${expectedRainfall} mm\n` +
            `Rainfall details: ${rainMessages.join('. ')}\n`
           //`Most rain expected between ${maxRainTime}, with ${maxRainFall} mm.`;
    }
    // little rain
    else if (rainMessages.length != 0 && expectedRainfall >= 0){
        return `Today's weather:\n` +
           `Temperature: ${avgTemp}°C\n` +
           `Wind: ${avgWindSpeed} km/h\n` +
           `Rain: ${expectedRainfall} mm\n` +
           `Rainfall details: light rain expected`
          //`Most rain expected between ${maxRainTime}, with ${maxRainFall} mm.`;
    } 
    //high rain
    else{
        return `Today's weather:\n` +
        `Temperature: ${avgTemp}°C\n` +
        `Wind: ${avgWindSpeed} km/h\n` +
        `Rain: ${expectedRainfall} mm\n` +
        `Rainfall details: No rain expected today.`
       //`Most rain expected between ${maxRainTime}, with ${maxRainFall} mm.`;
    }
}


//severe weather check to decipher if any weather if the next 12 hours is consider dangeroulsy high//
//returns an array of messages
export function severeWeatherCheck(forecast) {
    var messages = [];
    forecast.forEach(interval => {
        var time = interval.dt_txt;
        var rainfall = (interval.rain && interval.rain['3h']) ? interval.rain['3h'] : 0;
        var windSpeed = interval.wind.speed;
        var windGust = interval.wind.gust;
        var temperature = interval.main.temp;

        if (rainfall >= 100 && (windSpeed >= 119 || windGust >= 119)) {
            messages.push('TYPHOON WARNING: Dangerously high rainfall and wind speed expected at: ' + time);
         //   insertAlert(alertID, 6, 'TYPHOON WARNING: Dangerously high rainfall and wind speed expected at: ' + time)
            alertID++;
        } else if (rainfall >= 75) {
            messages.push('FLASH FLOOD WARNING: Dangerously high rainfall expected at: ' + time);
          //  insertAlert(alertID, 5, 'FLASH FLOOD WARNING: Dangerously high rainfall expected at: ' + time)
            alertID++;
        } else if (windSpeed >= 65 || windGust >= 93) {
            messages.push('HIGH WIND WARNING: Dangerously high wind speed expected at: ' + time);
           // insertAlert(alertID,11, 'TYPHOON WARNING: Dangerously high rainfall and wind speed expected at: ' + time)
            alertID++;
        } else if (temperature >= 40) {
            messages.push('TEMPERATURE WARNING: Dangerously high temperature expected at: ' + time);
          // insertAlert(alertID, 4, 'TYPHOON WARNING: Dangerously high rainfall and wind speed expected at: ' + time)
            alertID++;
        } else {
            console.log('No severe warning for time: ' + time);
        }
    });
    return messages;
}


