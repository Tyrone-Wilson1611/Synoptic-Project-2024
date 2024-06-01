//Things to do 
// 1 - write the code to send messages to every phone number in a data structure.
// 2 - change the weather data retrievel from an array to a hasmap to aid in use in other functions (luxury not needed, can slightly make code more efficient if we reuse it alot whoch we arent at the moment)

//notes 
// if you want to alter or add any specifics go to openweather api documentation and go to 5 day/3 houlry api, there it will tell you any attributes you can add to the data.
// send sms function is not in the form we should have as final produc it does what we want but not how we want, we need to change to send to multiple people ( this can be done serveral ways).
// most of the code for send sms can be found on clicksend api docs, if there are any errors or if you want to know or change the code look at https://developers.clicksend.com/docs/rest/v3/.


import fetch from 'node-fetch';
import {getallPhoneNums} from './database.mjs';

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


const olliePhoneNumber = '447401105231';
const jamiePhoneNumber = '447575202880';
const tyronePhoneNumber = '447939105014';
const norbertPhoneNumber = '447592797548';
const testPhoneNumber = '61411111111';


const messageFunction = async (message) => {
    // Ollie's account authentication details
    const username = 'ollieSMS';
    const apiKey = '4B1D7004-C2C2-2CEA-D49E-5C8406E03346';
    // Can add a 'from' if we want (we should).

    getallPhoneNums.forEach(async phoneNumber => {
        const data = {
            "messages": [
                {
                    "to": phoneNumber,
                    // "from": 'Pu Ngaol SMS service',
                    "source": 'sdk',
                    "body": message
                }
            ]
        };

        try {
            const response = await fetch('https://rest.clicksend.com/v3/sms/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString(`base64`)}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.json();;
                console.log(error)
            } else {
                const result = await response.json();
                console.log(result)
            }
        } catch (error) {
            console.log(err)
        }
    });
};

//setInterval(() => getThreeHourlyWeatherData(severeWeatherCheckURL), 1000 * 60 * 60 * 3);
//setInterval(() => getDailyWeatherData(dayForescastURL), 1000 * 60 * 60 * 24);


//extra tests
//messageFunction(testPhoneNumber, message);
//messageFunction()
