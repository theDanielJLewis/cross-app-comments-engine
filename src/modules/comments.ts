import jsonfile from 'jsonfile';
import { Comment } from '../types/comments';
import path from 'path';
import hashObject from '../helpers/hashObject';
import * as findEpisode from '../helpers/findEpisode';

const epMetadataFile = '../data/episode100-metadata.json';
const podcastFile = '../data/podcast.json';

export async function submit(comment: Comment) {
	const podcastData = await jsonfile.readFile(
		path.resolve(__dirname, podcastFile)
	);

	const id = hashObject({
		date: comment.date,
		author: comment.author,
		source: comment.source,
	});
	comment.id = id;

	podcastData.pendingComments.push(comment);
	console.log(podcastData);

	await jsonfile.writeFile(path.resolve(__dirname, podcastFile), podcastData, {
		spaces: 2,
		EOL: '\r\n',
	});
	return podcastData.pendingComments;
}

export async function publish(comments: Comment[]): Promise<Comment[]> {
	// const episode = findEpisode.byGuid(comment.guid)

	const epMetadata = await jsonfile.readFile(
		path.resolve(__dirname, epMetadataFile)
	);

	epMetadata.comments = [...epMetadata.comments, ...comments];
	console.log(epMetadata.comments);
	await jsonfile.writeFile(
		path.resolve(__dirname, epMetadataFile),
		epMetadata,
		{
			spaces: 2,
			EOL: '\r\n',
		}
	);

	return epMetadata.comments;
}

export async function getPending(): Promise<Comment[]> {
	const podcastData = await jsonfile.readFile(
		path.resolve(__dirname, podcastFile)
	);
	return podcastData.pendingComments;
}

export async function approve(commentIds: string[]): Promise<Comment[]> {
	const pendingComments = await getPending();
	const commentsToPublish = pendingComments.filter((comment) =>
		commentIds.includes(comment.id)
	);
	await removeFromPending(commentIds);
	const publishedComments = await publish(commentsToPublish);

	return publishedComments;
}

export async function removeFromPending(
	commentIds: string[]
): Promise<Comment[]> {
	const podcastData = await jsonfile.readFile(
		path.resolve(__dirname, podcastFile)
	);

	const pendingComments = await getPending();
	const filteredComments = pendingComments.filter(
		(comment) => !commentIds.includes(comment.id)
	);

	podcastData.pendingComments = filteredComments;

	await jsonfile.writeFile(path.resolve(__dirname, podcastFile), podcastData, {
		spaces: 2,
		EOL: '\r\n',
	});

	return filteredComments;
}
