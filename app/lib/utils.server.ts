import CryptoJS from 'crypto-js';
import axios from 'axios';

const phone = process.env.NCP_SMS_PHONE;
const accessKey = process.env.NCP_ACCESS_KEY;
const secretKey = process.env.NCP_SECRET_KEY;
const serviceId = process.env.NCP_SMS_SERVICE_ID;
const url = `/sms/v2/services/${serviceId}/messages`;

const makeSignature = () => {
  if (!phone || !accessKey || !secretKey || !serviceId) return;

  const space = ' ';
  const newLine = '\n';
  const method = 'POST';
  const timestamp = `${Date.now()}`;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();

  return { hash: hash.toString(CryptoJS.enc.Base64), timestamp, accessKey };
};

export const sendMessage = async (content: string, to: string | string[], countryCode: number = 82) => {
  try {
    const signature = makeSignature();
    if (!signature) return false;

    const { hash, timestamp, accessKey } = signature;

    await axios.post(
      `https://sens.apigw.ntruss.com${url}`,
      {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: `${countryCode}`,
        from: phone,
        content,
        messages: Array.isArray(to) ? to.map(d => ({ to: d })) : [{ to }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ncp-apigw-timestamp': timestamp,
          'x-ncp-iam-access-key': accessKey,
          'x-ncp-apigw-signature-v2': hash
        }
      }
    );

    return true;
  } catch (err: any) {
    console.error(err + '');
    return false;
  }
};
