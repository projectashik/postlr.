import CryptoJS from 'crypto-js';

export const encryptToken = (token: string) => {
  const cipherText = CryptoJS.AES.encrypt(
    <string>token,
    <string>process.env.SECRET_KEY
  ).toString();
  return cipherText;
};

export const decryptToken = (token: string) => {
  const bytes = CryptoJS.AES.decrypt(
    <string>token,
    <string>process.env.SECRET_KEY
  );
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};
