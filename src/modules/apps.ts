import jsonfile from 'jsonfile';
import path from 'path';
import { App } from '../types/apps';
const appsFile = path.resolve(__dirname, '../data/apps.json');

export async function getApps(): Promise<App[]> {
	const apps = await jsonfile.readFile(appsFile);
	return apps;
}
