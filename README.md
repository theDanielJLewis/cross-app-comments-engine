# cross-app-comments-engine

Proof-of-concept for cross-app comments in Podcasting 2.0.

## Demo

[![Demo of cross-app comments system](https://img.youtube.com/vi/eWkBgD6J1pk/0.jpg)](https://www.youtube.com/watch?v=eWkBgD6J1pk)

## How to run from source

You must already have Node.js and NPM or Yarn available (the following uses Yarn).

```sh
yarn
yarn dev
```

Then send requests to http://localhost:3000/

## Build

```sh
yarn build
```

## Generate key pair and auth token

You'll need public and private keys for your app.

After building, run:

```sh
yarn keygen
```

Then run the following where "App Name" is the name of your app exactly as it will appear in your POST request headers and verified apps repo.

```sh
yarn create-token "App Name"
```

## Request methods

### Submit comment

Send a GET request with the comment payload data and a public key header to the API. The comment will go into the podcast's `pendingComments` array.

This request could be allowed only by podcast apps. Default behavior is that all submitted comments are held for moderation.

Example payload:

```json
{
	"episodeGuid": "https://theaudacitytopodcast.com/?p=5712",
	"date": "2023-04-01T20:12:01.324Z",
	"author": "Daniel J. Lewis",
	"content": "This is no April Fool's!",
	"source": "Overcast"
}
```

### Approve comments

Send a PUT request with an array of comment IDs to approve. This would be allowed only by the moderation app/service the podcaster uses.

Example payload:

```json
{ "commentIds": ["177546d395850fe276590e68371f14e8"] }
```

### Access published comments

Send an optionally anonymous GET request to the episode's metadata URL, exactly like accessing chapters (which would be in the same metadata file).

### Access pending comments

Use a moderation app/service to handle API requests or privately edit the podcast-level metadata JSON.

## Philosophy

I believe podcasting should remain open, giving the podcaster ultimate control over their show and enabling a good experience for audiences and developers.

Portability is core to this principle.

With my proposal, cross-app comments can exist and be hosted without _any_ special software. Just like a the RSS feed, media files, images, and episode metadata, the resulting data from cross-app comments can be hosted anywhere and moved at a podcasters' discretion.

This system is merely a demonstration of the simplicity available to developers to support cross-app comments in their podcast apps and servers, and the power podcasters would have to moderate comments on their own.

This approach is so simple that the moderation could be run on WordPress, with a standalone app in any language, through a third-party service, or provided by the podcast-hosting provider.
