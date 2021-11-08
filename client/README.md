# Task Manager Client
This is the Client, based on both business and technical requirements.

##Getting started
Download and install **Node.js** version **10.15.0** from https://nodejs.org/en/download/releases/.

Follow setup instructions of the **API layer** in [API Documentation](/API_DOC.md).
>⚠️ **Important**: For me - at least - `$ sails lift` twice(?) worked instead of `$ npm start`.

Install the **http-server** Node.js package:
```bash
$ npm install http-server@0.12.3 -g
```
More info: https://www.npmjs.com/package/http-server

To get started run the following commands in the `/client` folder:
```bash
$ http-server -c-1
```

The Client should now be available at `http://localhost:8080/`.

## Features
As I believe, from users perspective, an application in production must sit on two main principles: **user experience** and **performance**.

### User experience
The Skill Assessment does not aim reaching high user experience, but I believe that a smart but very simple design is as important as what we see under the hood...

### Performance
In order to achieve maximum performance, the Client has the following features under the hood:
- Minimal set of 3rd party resources
- Load resources on demand
- Call API only when needed
- DOM is changed/updated only where it must be

The Client follows the KISS (**k**eep **i**t **s**imple, **s**tupid) principle, Every function implements only one, basic task, in order to prevent commenting or large if/else blocks.

## Testing
The Task Manager Component test is available at `http://localhost:8080/test/`.

## ...How I performed :)
From my perspective?
- I never used node.js, and to be honest, i never liked it. Took me ages to align the different versions of the server, sails and the http-server package. Almost pulled my hairs out...
- I never used GIT, it took me hours to set up Sourcetree, and integrate the features in my fav SublimeText editor.
- I never wrote tests, as I never believed in it, but happy to argue on that.

Everything else went well, the code You see is the way I always develop, no glitches on it.
I can learn new ways, new frameworks, new ideas - I just wanted You to know what is in the package. No secret, no worries.

From Your perspective?
I hope to know it soon :)