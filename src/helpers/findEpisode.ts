import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const feedUrl = 'https://feeds.podcastmirror.com/theaudacitytopodcast';

export async function byGuid(guid: string) {
	const parserOptions = {
		ignoreAttributes: true,
	};
	const parser = new XMLParser(parserOptions);
	const { data } = await axios.get(feedUrl);
	const feedObj = parser.parse(data);
	const items = feedObj.rss.channel.item;
	const match = items.find((item: any) => item.guid === guid);
	return match;
}

export async function byEnclosureUrl(enclosureUrl: string) {
	const parserOptions = {
		ignoreAttributes: false,
		attributeNamePrefix: '',
	};
	const parser = new XMLParser(parserOptions);
	const { data } = await axios.get(feedUrl);
	const feedObj = parser.parse(data);
	const items = feedObj.rss.channel.item;
	const match = items.find((item: any) => item.enclosure.url === enclosureUrl);
	return match;
}

// byGuid('https://theaudacitytopodcast.com/?p=10974');
// byEnclosureUrl(
// 	'https://media.blubrry.com/theaudacitytopodcast/op3.dev/e/traffic.libsyn.com/noodlemx/tap306.mp3'
// );
