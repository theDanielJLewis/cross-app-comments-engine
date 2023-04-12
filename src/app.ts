import express from 'express';
const app = express();
app.use(express.json());
import * as comments from './modules/comments';
import jsonfile from 'jsonfile';
import { getApps } from './modules/apps';

// Get published comments
app.get('/:episodeGuid', (req, res) => {
	res.send('Hello World');
});

// Get pending comments
app.get('/:episodeGuid/pending', async (req, res) => {
	const pendingComments = await comments.getPending();
	res.send(pendingComments);
});

// Approve comments
app.put('/', async (req, res) => {
	const commentIds = req.body.commentIds;
	const allComments = await comments.approve(commentIds);

	res.send(allComments);
});

// Submit comment
app.post('/', restrict, async (req, res) => {
	const comment = req.body;
	if (!comment) return res.status(400).send('Missing comment');

	const result = await comments.submit(comment);

	return res.status(202).send('Comment received! Awaiting moderation.');
});

app.listen(3000, () => console.log('Listening on port 3000'));

// Proceed only if the key matches
async function restrict(
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