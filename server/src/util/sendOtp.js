import axios from "axios";
import config from "../config/config.js";


export const sendSms = async (phoneNumber, otp) => {
    console.log(phoneNumber, otp);
    
    try {
        const { data } = await axios.post("https://control.msg91.com/api/v5/flow/",  
            {
                template_id: config.msg91.smsTemplateId,
                recipients: [
                    {
                        mobiles: phoneNumber,
                        var: otp
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json",
                    "authkey": config.msg91.authKey,
                }
            },
        );
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};


export const sendEmail = async (email, otp) => {
  try {
    const { data } = await axios.post(
      'https://control.msg91.com/api/v5/email/send',
      {
        to: [
          {
            email,
            name: email
          }
        ],
        from: {
          email: 'no-reply@avenaa.co.in',
          name: 'Avenaa'
        },
        template_id: config.msg91.emailTemplateId,
        variables: {
          otp
        }
      },
      {
        headers: {
          authkey: config.msg91.authKey,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Email sent:', data);
    return data;
  } catch (error) {
    console.error(
      'Email error:',
      error.response?.data || error.message
    );
  }
};