import fetch from 'node-fetch';

export function getDailyWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`error: ${error}`);}
            return response.json();
        }).then(weatherData => {
            //console.log(JSON.stringify(weatherData), null, 4)
            checks(weatherData.list); }).catch(error => {
            console.error('Error fetching weather data:', error);});
}

export function getThreeHourlyWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`error: ${error}`);}
            return response.json();
        }).then(weatherData => {
            //console.log(JSON.stringify(weatherData), null, 4)
            severeWeatherCheck(weatherData.list[0]); }).catch(error => {
            console.error('Error fetching weather data:', error);});
}

function checks(forecast) {
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

    avgTemp /= 4;
    avgWindSpeed /= 4;
    avgTemp = Math.round(avgTemp);
    avgWindSpeed = Math.round(avgWindSpeed * 10)/10;
    expectedRainfall = Math.round(expectedRainfall);

    return 'Nu Pgoal Daily weather update. Average temperature today: ' + avgTemp + '°C  .Average wind speed : ' + avgWindSpeed + ' KPH .And expected rainfall is around: ' + expectedRainfall +'mm. Any other properties we want ot add.....' ;

}

function severeWeatherCheck(weather){
  
    var hrainfall = (weather.rain && weather.rain['3h']) ? weather.rain['3h'] : 0; 
    var htemp = weather.main.temp;
    var hwindSpeed = weather.wind.speed; 
    var time = weather.dt_txt;
    if(hrainfall >= 50){ 
        return 'Rain: ' + hrainfall + 'at :' + time;
    }
    else if(htemp >= 35) { 
        return  'Temp: ' + htemp + 'at :' + time;
    }
    else if(hwindSpeed >= 30) { 
        return  'Wind Speed: ' + hwindSpeed + 'at :' + time;
    }
    else{
        console.log('no severe warning for time: ' + time)
    }
}
