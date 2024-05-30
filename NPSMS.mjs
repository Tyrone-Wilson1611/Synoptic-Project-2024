import fetch from 'node-fetch';

//if you want to alter or add any specifics go to openweather api documentation and go to 5 day/3 houlry api, there it will tell you any attributes you can add to the data.
//This url will open a page that returns weather info for location lat 12.57 and long 106.9 which is the village hall of pu ngaol i believe, if im wrong feel free to change you can test by putting into your web broweser.
//just dont chnage the appid as this is a speific key.
//cnt = 4 mean that only the next 4 (3h updates) are retrived (i overlooked before this which caused me hours of pain trying to get weathercheck function working)
//tHing there may be a bug with the location
const URL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&cnt=4&appid=331e13a2241a062eec05fdd320fad13b&units=metric";

//code to request data using API weather

function getWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`error: ${error}`);}
            return response.json();
        }).then(weatherData => {
            console.log(JSON.stringify(weatherData), null, 4)
            checks(weatherData.list); }).catch(error => {
            console.error('Error fetching weather data:', error);});
}
getWeatherData(URL)


//NOT DONT YET// but does work as intended. 
// for this function so far, get some essential parameters, then find the avergage or expected vaulues and print to screen (just for testing purposes)
// we will later all the SMS function from inside this function, passing through the message parameter as either a body or string formated however we feel.//
// need to add extreme weather warning i.e. //
function checks(forecast) {
    var hwindSpeed;
    var htemp;
    var hrainfall;
    var time;
    var avgTemp = 0;
    var avgWindSpeed = 0;
    var expectedRainfall = 0;

    forecast.forEach(update => {
        hrainfall = (update.rain && update.rain['3h']) ? update.rain['3h'] : 0; 
        htemp = update.main.temp;
        hwindSpeed = update.wind.speed; 
        time = update.dt_txt;
        if(hrainfall >= 50){ weatherWarning('Rain: ' + hrainfall + 'at :' + time)}
        else if(htemp >= 35) { weatherWarning('Temp: ' + htemp + 'at :' + time)}
        else if(hwindSpeed >= 30) { weatherWarning('Wind Speed: ' + hwindSpeed + 'at :' + time)}
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
    console.log(avgTemp+' degrees Celsius : The average temp in the next 12 hours');
    console.log(avgWindSpeed+'KPH : Average wind speed in the next 12 hours');
    console.log(expectedRainfall +'mm of rain expected in the next 12 hours');
}

function weatherWarning(warning){
    console.log('Severe weather expected: ' + warning + 'Seek shelter immediately or prepare accordingly')

}


const olliePhoneNumber = '447401105231';
const jamiePhoneNumber = '447575202880';
const tyronePhoneNumber = '447939105014';
const norbertPhoneNumber = '447592797548';


const message = 'This is a test, hopefully this works';


//changed sms api service to clicksend, this async function takes in the phone number and message.
// we have 2 options loop for every phone number, and send a message. or send a message to everyone at once (this would be harder i believe)
//most of this code can be found on clicksend api docs, if you want to know or change look at https://developers.clicksend.com/docs/rest/v3/.
// const messageFunction = async (PhoneNumber, message) =>{
//     //ollies account authentiation details
//     const username = 'ollieSMS';
//     const apiKey = '4B1D7004-C2C2-2CEA-D49E-5C8406E03346'
//     //can add a 'from' if we want(we should). 
//     const data = {
//         "messages": [
//         {
//             "to": myPhoneNumber,
//             "source": 'sdk',
//             "body": message
//         }
//         ]
//     };
//     const response = await fetch('https://rest.clicksend.com/v3/sms/send',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString(`base64`)}`
//     },
//     body: JSON.stringify(data)
//     });
    
//     if(!response.ok){
//         const error = await response.json();
//     console.error('Error', error)} 
//     else{
//         const result = await response.json();
//     console.log("sms sent", result);}
// };


// messageFunction(olliePhoneNumber, message);
