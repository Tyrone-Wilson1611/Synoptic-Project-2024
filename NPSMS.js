const fetch = require('node-fetch')

const URL = 'api.openweathermap.org/data/2.5/forecast?lat=12.57&lon=106.9&appid=331e13a2241a062eec05fdd320fad13b'
//code to request data using API weather



//function to determine if weather is extreme
function weatherupdate(URL, ){

}
function extremeWeather(){
    if (blablabla){
        return true;
    }
}
;


// this is ollies authentication data, we only need one persons.

const myPhoneNumber = '447401105231';
const jamiePhoneNumber = '447575202880';
const tyronePhoneNumber = '447939105014';
const norbertPhoneNumber = '447592797548';



message = 'This is a test, hopefully this works';


const message = 'This is a test, hopefully this works';


//chnaged sms api service to clicksend, this async function 
const sendSms = async (myPhoneNumber, message) =>{
    const username = 'ollieSMS';
    const apiKey = '4B1D7004-C2C2-2CEA-D49E-5C8406E03346'

    const data = {
        messages: [
        {
            source: 'nodejs',
            from:  'NPSMS Service',
            body: message,
            to: myPhoneNumber,
        }
        ]
    };

    const response = await fetch('https://rest.clicksend.com/v3/sms/send',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString(`base64`)}`
    },
    body: JSON.stringify(data)
    });

    if(!response.ok){
        const error = await response.json();
        console.error('Error', error)
    } else{
        const result = await response.json();
        console.log("sms sent", result);
    }

};

    
sendSms(myPhoneNumber, message);
