import express from 'express';
import { getApps } from '../modules/apps';

// Proceed only if the key matches
export default async function restrict(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	const apps = await getApps();
	const publicKey = req.headers.publickey;
	const app = apps.filter((a) => a.publicKey === publicKey);
	console.log(app);

	if (app.length > 0) {
		next();
	} else {
		res.status(401).send('Access denied!');
	}
}
