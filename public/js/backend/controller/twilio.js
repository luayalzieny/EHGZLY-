const accountSid = "ACe601ea7a25a9639b433894cd503afc13";
const authToken = "5deb3c4580f39d3c454920ba36c1b200";

const sendSms = (phone, message) => {
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: message,
       from: "+17542108545",
       to: phone
     })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
}

module.exports = sendSms;