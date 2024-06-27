const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async () => {
  const msg = {
    to: process.env.SENDER_EMAIL, // Change to your recipient
    from: process.env.RECEIPIENT_EMAIL, // Change to your verified sender
    subject: 'Will this deliver to inbox',
    text: 'Hi i am sending this to test out emails from my node.js app',
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
