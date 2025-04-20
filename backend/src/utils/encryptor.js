import cryptoJs from "crypto-js";

function encrypt(data){
      return cryptoJs.AES.encrypt(data, process.env.ENCRYPTION_KEY).toString();
}
function decrypt(data){
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}


export {encrypt, decrypt}

