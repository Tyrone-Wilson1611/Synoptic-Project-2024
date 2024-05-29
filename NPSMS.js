const twilio = require('twilio');
api.openweathermap.org/data/2.5/forecast?
lat={'12.5777'}&lon={'106.9349'}&appid={'331e13a2241a062eec05fdd320fad13b'}
//code to request data using API weather



//function to determine if weather is extreme
function weatherupdate(){

}
function extremeWeather(){
    if (blablabla){
        return true;
    }
}
;
//code to send a messgae to our phone number via the twilio number.

// this is ollies authentication data, we only need one persons.
const accountSid = 'AC14167b90a7b77edbc61ef3d0994f750e';
const authToken = 'aaf42b244beec10f1ad8eea71be77965';

const client = new twilio.Twilio(accountSid, authToken);

const twilioPhoneNumber = '';
const myPhoneNumber = '447401105231';
const JamiePhoneNumber = '447575202880';


//method to create message.//
client.messages.create({
    body: 'Hi',
    from: twilioPhoneNumber,
    to: myPhoneNumber
  })
  .then(message => console.log('Message sent. SID:', message.sid))
  .catch(err => console.log('Error sending message:', err));
