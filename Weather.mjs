import fetch from 'node-fetch';

const dayForescastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=4&appid=331e13a2241a062eec05fdd320fad13b&units=metric";
const severeWeatherCheckURL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=1&appid=331e13a2241a062eec05fdd320fad13b&units=metric";


function getDailyWeatherData(url) {
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
getDailyWeatherData(dayForescastURL)


function getThreeHourlyWeatherData(url) {
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
getThreeHourlyWeatherData(severeWeatherCheckURL)


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

    //testing//
    // console.log(avgTemp+' degrees Celsius : The average temp in the next 12 hours');
    // console.log(avgWindSpeed+'KPH : Average wind speed in the next 12 hours');
    // console.log(expectedRainfall +'mm of rain expected in the next 12 hours');

     messageFunction('Nu Pgoal Daily weather update. Average temperature today: ' + avgTemp + '°C  .Average wind speed : ' + avgWindSpeed + ' KPH .And expected rainfall is around: ' + expectedRainfall +'mm. Any other properties we want ot add.....' );

}

function severeWeatherCheck(weather){
  
    var hrainfall = (weather.rain && weather.rain['3h']) ? weather.rain['3h'] : 0; 
    var htemp = weather.main.temp;
    var hwindSpeed = weather.wind.speed; 
    var time = weather.dt_txt;
    if(hrainfall >= 50){ 
        // messageFunction('Rain: ' + hrainfall + 'at :' + time);
         messageFunction(testPhoneNumber,'Rain: ' + hrainfall + 'at :' + time);
    }
    else if(htemp >= 35) { 
       // messageFunction('Temp: ' + htemp + 'at :' + time);
        messageFunction(testPhoneNumber,'Temp: ' + htemp + 'at :' + time);
    }
    else if(hwindSpeed >= 30) { 
       // messageFunction('Wind Speed: ' + hwindSpeed + 'at :' + time);
        messageFunction(testPhoneNumber, 'Wind Speed: ' + hwindSpeed + 'at :' + time);
    }
    else{
        console.log('no severe warning for time: ' + time)
    }
}
