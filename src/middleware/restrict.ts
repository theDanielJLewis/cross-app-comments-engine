import express from 'express';
import { getApps } from '../modules/podcastApps';

// Proceed only if the key matches
export default async function restrict(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	const publicKey = req.headers.publickey;
	let podcastApps = await getApps();
	podcastApps = podcastApps.filter((a) => a.publicKey === publicKey);
	console.log(podcastApps);

	if (podcastApps.length > 0) {
		next();
	} else {
		res.status(401).send('Access denied!');
	}
}
