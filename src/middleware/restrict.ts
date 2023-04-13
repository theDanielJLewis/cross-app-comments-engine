import express from 'express';
import { getApps } from '../modules/podcastApps';
import { decryptString } from '../helpers/crypto';
import crypto from 'crypto';

// Proceed only if the key matches
export default async function restrict(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	if (!req.headers['x-auth-token'])
		return res.status(400).send('Missing x-auth-token header');
	const auth = req.headers['x-auth-token'].toString();

	if (!req.headers['source'])
		return res.status(400).send('Missing source header');
	const source = req.headers['source'];

	let podcastApps = await getApps();
	const podcastApp = podcastApps.find((app) => app.name === source);
	if (!podcastApp) return res.status(401).send('Unverified app');

	const decryptedName = await decryptString(auth, podcastApp.publicKey);
	if (decryptedName === podcastApp.name) {
		next();
	} else if (decryptedName === 400) {
		return res.status(400).send('Invalid auth token');
	} else {
		return res.status(401).send('Access denied');
	}
}

// function base64ToArrayBuffer(b64) {
// 	var byteString = btoa(b64);
// 	var byteArray = new Uint8Array(byteString.length);
// 	for (var i = 0; i < byteString.length; i++) {
// 		byteArray[i] = byteString.charCodeAt(i);
// 	}

// 	return byteArray;
// }
