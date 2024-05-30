import fetch from 'node-fetch';


//if you want to alter or add any specifics go to openweather api documentation and go to 5 day/3 houlry api, there it will tell you any attributes you can add to the data.
//This url will open a page that returns weather info for location lat 12.57 and long 106.9 which is the village hall of pu ngaol i believe, if im wrong feel free to change you can test by putting into your web broweser.
//just dont chnage the appid as this is a speific key.
const URL = "https://api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&appid=331e13a2241a062eec05fdd320fad13b"

//code to request data using API weather


function getWeatherData(url) {
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`error: ${error}`);
        }
                   return response.json();
                }).then(weatherData => {

        // weather data is returned 'pretty print' i.e. is formatted easier to read  (even though nobody will ever know).
        //basically indents (value 4) for each hierarchical level, and includes all objects wether or not they have data.
                    console.log(JSON.stringify(weatherData, null, 4));
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }

getWeatherData(URL)


//function extremeWeather(){
//     if (blablabla){
//         return true;
//     }
// }
// ;


const myPhoneNumber = '447401105231';
const jamiePhoneNumber = '447575202880';
const tyronePhoneNumber = '447939105014';
const norbertPhoneNumber = '447592797548';


const message = 'This is a test, hopefully this works';


//changed sms api service to clicksend, this async function takes in the phone number and message.
// we have 2 options loop for every phone number, and send a message. or send a message to everyone at once (this would be harder i believe)
const sendSms = async (myPhoneNumber, message) =>{
    //ollie authentiation details
    const username = 'ollieSMS';
    const apiKey = '4B1D7004-C2C2-2CEA-D49E-5C8406E03346'

    const data = {
        "messages": [
        {
            "to": myPhoneNumber,
            "source": 'sdk',
            "body": message
            
        }
        ]
    };

    //initialize a http request and return a promise
    //parts of this code can be found on the clicksend docs web page.
    const response = await fetch('https://rest.clicksend.com/v3/sms/send',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString(`base64`)}`
    },
    body: JSON.stringify(data)
    });
    

    //error checking

    if(!response.ok){
        const error = await response.json();
        console.error('Error', error)
    } else{
        const result = await response.json();
        console.log("sms sent", result);
    }

};

        
//creating instace of function
sendSms(myPhoneNumber, message);
