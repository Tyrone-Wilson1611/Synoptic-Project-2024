import fetch from 'node-fetch'; // Ensure you have node-fetch installed
import { decryptPhoneNumber, getKey } from './encryption.mjs';


const key = getKey();

const olliePhoneNumber = '447401105231';
const jamiePhoneNumber = '07575202880';
const tyronePhoneNumber = '447939105014';
const norbertPhoneNumber = '447592797548';
const testPhoneNumber = '61411111111';

export const messageFunction = async (message, allphonenum) => {
    if (allphonenum.length == 0) {
        console.log('empty');
        return;
    }
    const nums = allphonenum;
    const username = 'ollieSMS';
    const apiKey = '4B1D7004-C2C2-2CEA-D49E-5C8406E03346';

    for (const phoneNumber of nums) {
        console.log(phoneNumber)
        console.log(decryptPhoneNumber(phoneNumber, key))
        const data = {
            "messages": [
                {
                    "to": decryptPhoneNumber(phoneNumber, key),
                    "source": 'sdk',
                    "body": message
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
    }
};

export const singleMessageFunction = async (message) => {
    const username = 'ollieSMS';
    const apiKey = '4B1D7004-C2C2-2CEA-D49E-5C8406E03346';

    const data = {
        "messages": [
            {
                "to": testPhoneNumber,
                "source": 'sdk',
                "body": message
            }
        ]
    };

    

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
