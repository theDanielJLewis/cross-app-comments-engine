export interface Comment {
	type?: string;
	podcastGuid: string;
	id: string;
	episodeGuid?: string;
	reply?: string;
	date: date;
	status?: string;
	author: string;
	authorId: string;
	email?: string;
	content: string;
	source?: string;
	geo?: string;
	boost?: object;
	replies?: Comment[];
}
