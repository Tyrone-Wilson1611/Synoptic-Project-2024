//file that fetchs weather data and returns text/A message based on that data that is returned to us.//
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


//funtion to retrieve certain properties of the weather, and manipulate them as we need//
export function dailyWeatherChecks(forecast) {
    var hwindSpeed, htemp, hrainfall;
    var avgTemp, avgWindSpeed, expectedRainfall, count = 0;
    forecast.forEach(update => {
        hrainfall = (update.rain && update.rain['3h']) ? update.rain['3h'] : 0; 
        htemp = update.main.temp;
        hwindSpeed = update.wind.speed; 
        avgTemp += htemp;
        avgWindSpeed += hwindSpeed;
        expectedRainfall =+ hrainfall;
        count ++;
    });
    //find averages i.e. divide by the amount of updates//
    avgTemp /= count;
    avgWindSpeed /= count;
    avgTemp = Math.round(avgTemp);
    avgWindSpeed = Math.round(avgWindSpeed * 10)/10;
    expectedRainfall = Math.round(expectedRainfall);

    //Summary translated in khmer and formatted as a message/
    return 'ព័ត៌មានអាកាសធាតុ Nu Pgoal:\n' +
    'ថ្ងៃនេះ:\n' +
    '- សីតុណ្ហភាព: ' + avgTemp + '°C\n' +
    '- ខ្យល់: ' + avgWindSpeed + ' KPH\n' +
    '- ភ្លៀង: ' + expectedRainfall + ' mm';
}


//severe weather check to decipher if any weather if the next 12 hours is consider dangeroulsy high//
//returns an array of messages
export function severeWeatherCheck(forecast) {
    var messages = [];
    forecast.forEach(interval => {
        var time = interval.dt_txt;
        if ((interval.rain && interval.rain['3h'] ? interval.rain['3h'] : 0) >= 50) {
            messages.push('FLASH FLOOD WARNING: Dangerously high rainfall expected at: ' + time);
        }
        else if (interval.main.temp >= 50) {
            messages.push('TEMPERATURE WARNING: Dangerously high temperature expected at: ' + time);
        }
        else if (interval.wind.speed >= 119 || (interval.wind.gust && interval.wind.gust >= 119)) {
            messages.push('TYPHOON WARNING: Dangerously high wind speed expected at: ' + time);
        } else {
            console.log('No severe warning for time: ' + time);
        }
    });
    return messages;
}

