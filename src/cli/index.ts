import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { encryptString, generateKeyFiles } from '../helpers/crypto';
const argv: any = yargs(hideBin(process.argv)).argv;

if (argv['generate-keys']) {
	generateKeyFiles();
	process.exit();
}

if (argv['create-token']) {
	const token = encryptString(argv['create-token']);
	console.log('x-auth-token:', token);
	process.exit();
}
