import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

// async function encrypt() {
// 	const privateKey = await fs.readFile(privateKeyPath);
// 	const authToken = crypto.privateEncrypt(privateKey, Buffer.from(appName));
// 	console.log(authToken);
// 	// pm.collectionVariables.set("authToken", "authToken");
// }

export function generateKeyFiles() {
	const keyPair = crypto.generateKeyPairSync('rsa', {
		modulusLength: 520,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem',
		},
	});

	// Create private key files
	fs.writeFileSync('private_key', keyPair.privateKey);
	fs.writeFileSync('public_key', keyPair.publicKey);
}

export function encryptString(plaintext: string) {
	const privateKeyFile = './private_key';
	const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

	const encrypted = crypto.privateEncrypt(privateKey, Buffer.from(plaintext));
	return encrypted.toString('base64');
}

export function decryptString(encryptedString: string, publicKey: string) {
	try {
		const decrypted = crypto.publicDecrypt(
			publicKey,
			Buffer.from(encryptedString, 'base64')
		);
		return decrypted.toString();
	} catch (error) {
		return 400;
	}
}
