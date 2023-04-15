import express from 'express';
const app = express();
app.use(express.json());
import * as comments from '../modules/comments';
import restrict from '../middleware/restrict';
import { body, validationResult } from 'express-validator';

const receivedConfirmation = 'Thank you for commenting!';

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
app.post(
	'/',
	restrict,
	// body('date')
	// 	.isISO8601({ strict: true, strictSeparator: true })
	// 	.withMessage('Must contain date in ISO8601 format'),
	// body('podcastGuid').notEmpty().withMessage('Must contain podcastGuid'),
	// body('episodeGuid').notEmpty().withMessage('Must contain episodeGuid'),
	// body('author').notEmpty().withMessage('Must contain author'),
	// body('authorId').notEmpty().withMessage('Must contain authorId'),
	// body('content').notEmpty().withMessage('Must contain content'),
	// body('source').notEmpty().withMessage('Must contain source'),
	async (req, res) => {
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }

		const pendingComments = req.body.events;
		if (!pendingComments) return res.status(400).send('Missing comment');
		const result = await comments.submit(pendingComments);

		return res.status(202).send(receivedConfirmation);
	}
);

app.listen(3000, () => console.log('Listening on port 3000'));
