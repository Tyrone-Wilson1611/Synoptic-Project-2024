export var curretWeatherSevere = false;

export async function getDailyWeatherData(url) {
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`error: ${response.statusText}`);
    }
    const weatherData = await response.json();
    //console.log(JSON.stringify(weatherData.list, null, 4));
    return weatherData.list;
    
}
    
export async function getThreeHourlyWeatherData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`error: ${response.statusText}`);
    }
    const weatherData = await response.json();
    severeWeatherCheck(weatherData.list[0]);
    return weatherData;
    
}
    

export function checks(forecast) {
    var hwindSpeed;
    var htemp;
    var hrainfall;
    var avgTemp = 0;
    var avgWindSpeed = 0;
    var expectedRainfall = 0;

    forecast.forEach(update => {
        hrainfall = (update.rain && update.rain['3h']) ? update.rain['3h'] : 0; 
        htemp = update.main.temp;
        hwindSpeed = update.wind.speed; 
        avgTemp += htemp;
        avgWindSpeed += hwindSpeed;
        expectedRainfall =+ hrainfall;
    });

    avgTemp /= 5;
    avgWindSpeed /= 5;
    avgTemp = Math.round(avgTemp);
    avgWindSpeed = Math.round(avgWindSpeed * 10)/10;
    expectedRainfall = Math.round(expectedRainfall);
    
    return 'Nu Pgoal Daily weather update. Average temperature today: ' + avgTemp + '°C  .Average wind speed : ' + avgWindSpeed + ' KPH .And expected rainfall is around: ' + expectedRainfall +'mm. Any other properties we want ot add.....' ;
}



function severeWeatherCheck(weather) {
    var hrainfall = (weather.rain && weather.rain['3h']) ? weather.rain['3h'] : 0; 
    var htemp = weather.main.temp;
    var hwindSpeed = weather.wind.speed; 
    var time = weather.dt_txt;
    if(hrainfall >= 50){ 
        curretWeatherSevere = true;
        return 'Rain: ' + hrainfall + 'at :' + time;
    }
    else if(htemp >= 35) { 
        curretWeatherSevere = true;
        return  'Temp: ' + htemp + 'at :' + time;
    }
    else if(hwindSpeed >= 30) { 
        curretWeatherSevere = true;
        return  'Wind Speed: ' + hwindSpeed + 'at :' + time;
    }
    else{
        console.log('no severe warning for time: ' + time)
        curretWeatherSevere = false;
    }
}

export function isCurrentWeatherSevere() {
    return curretWeatherSevere;
}
