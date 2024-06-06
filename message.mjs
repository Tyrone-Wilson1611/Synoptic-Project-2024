//file to send SMS's using the clicksend api//

import fetch from 'node-fetch'; 
import { decryptPhoneNumber, ourKey} from './encryption.mjs';

//authoirzation data
const username = 'ollieSMS';
const apiKey = '4B1D7004-C2C2-2CEA-D49E-5C8406E03346';


//function to send message to an array of people via SMS//
//Takes in message as a parameter so that it could be used for other functions in the future other than just weather//
export const messageFunction = async (message, allphonenum, from) => {
    if (allphonenum.length == 0) {
        console.log('empty');
        return;}
    const nums = allphonenum;
    //for every instance of an encrypted phone number in the array send the messaeg//
    for (const phoneNumber of nums) {

        const data = {
            "messages": [
                {
                    "to": decryptPhoneNumber(phoneNumber, ourKey),
                    "source": 'sdk',
                    "body": message,
                    "from": from
                }
            ]
        };

        //code example from clicksend api docs//
        //POST request with the necessary headers that allign with the api docs//
        const response = await fetch('https://rest.clicksend.com/v3/sms/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error)
        } else {
            const result = await response.json();
            console.log(result)
        }
    }
};


//function that sends an message to a phone number via SMS//
export const singleMessageFunction = async (message, from) => {
    const data = {
        "messages": [
            {
                "to": testPhoneNumber,
                "source": 'sdk',
                "body": message,
                "from": from
            }
        ]
    };

    //code example from clicksend api docs
    const response = await fetch('https://rest.clicksend.com/v3/sms/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error)
    } else {
        const result = await response.json();
        console.log(result)
    }
};


//  singleMessageFunction('test');

//  var testallPhoneNums = ['447401105231',testPhoneNumber];
//  messageFunction('test', testallPhoneNums);


// const olliePhoneNumber = '447401105231';
// const jamiePhoneNumber = '07575202880';
// const tyronePhoneNumber = '447939105014';
// const norbertPhoneNumber = '447592797548';
// const testPhoneNumber = '61411111111';
