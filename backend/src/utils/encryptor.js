import cryptoJs from "crypto-js";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-fallback-encryption-key';

function encrypt(data) {
    try {
        if (!data) return '';
        return cryptoJs.AES.encrypt(data, ENCRYPTION_KEY).toString();
    } catch (error) {
        console.error('Encryption error:', error);
        return '';
    }
}

function decrypt(data) {
    try {
        if (!data) return '';
        const bytes = cryptoJs.AES.decrypt(data, ENCRYPTION_KEY);
        return bytes.toString(cryptoJs.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        return '';
    }
}

export { encrypt, decrypt };

