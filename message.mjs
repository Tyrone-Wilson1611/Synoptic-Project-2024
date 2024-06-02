// most of the code for send sms can be found on clicksend api docs, if there are any errors or if you want to know or change the code look at https://developers.clicksend.com/docs/rest/v3/.

import {getallPhoneNums} from '/encryption'

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
    
        const response = await fetch('https://rest.clicksend.com/v3/sms/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString(`base64`)}`
            },
            body: JSON.stringify(data)
        });
    
        if (!response.ok) {
            const error = await response.json();
            console.log(error);
        } else {
            const result = await response.json();
            console.log(result);
        }
    });
};

//setInterval(() => getThreeHourlyWeatherData(severeWeatherCheckURL), 1000 * 60 * 60 * 3);
//setInterval(() => getDailyWeatherData(dayForescastURL), 1000 * 60 * 60 * 24);


//extra tests
//messageFunction(testPhoneNumber, message);
//messageFunction()
