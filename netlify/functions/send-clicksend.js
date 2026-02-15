const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if(event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, phone, message } = JSON.parse(event.body);

  const API_KEY = process.env.CLICKSEND_API_KEY; // Client's API Key
  const USERNAME = process.env.CLICKSEND_USERNAME; // Client's ClickSend Username

  const payload = {
    messages: [
      {
        source: "javascript",
        from: "CompanyName",
        to: "+COMPANY_PHONE_NUMBER", // Client's number
        body: `New message from customer:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
      }
    ]
  };

  try {
    const res = await fetch('https://rest.clicksend.com/v3/sms/send', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${API_KEY}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if(res.ok) {
      return { statusCode: 200, body: JSON.stringify({success:true}) };
    } else {
      console.error(data);
      return { statusCode: 500, body: JSON.stringify({success:false}) };
    }
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({success:false}) };
  }
};