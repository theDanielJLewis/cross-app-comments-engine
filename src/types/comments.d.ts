export interface Comment {
	id: string;
	episodeGuid?: string;
	reply?: string;
	date: date;
	status?: string;
	author: string;
	email?: string;
	content: string;
	source: string;
	geo?: string;
	boost?: object;
	replies?: Comment[];
}
