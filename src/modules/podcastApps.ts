import jsonfile from 'jsonfile';
import path from 'path';
import { PodcastApp } from '../types/podcastApps';
const appsFile = path.resolve(__dirname, '../data/apps.json');

export async function getApps(): Promise<PodcastApp[]> {
	const apps = await jsonfile.readFile(appsFile);
	return apps;
}
