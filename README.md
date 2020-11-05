This is a test / demo client for 10Duke Identity and Entitlement service. The application demonstrates the following features:

- Single Sign-On against 10Duke using OpenID Connect with PKCE (Proof Key for Code Exchange)
- Consuming and releasing licenses
- Single Sign-Out

Sample licensed features of the test client are FOSS games. This test client uses the 10Duke Entitlement service for determining if user logged in to the test client has license required for accessing each game. Licenses for these games should be configured in the 10Duke Entitlement service against which testing. The games and the respective licensed item names used for 10Duke license checks are given in the table below:

| Licensed item | The game                                                              | License                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2048          | [2048](https://github.com/gabrielecirulli/2048)                       | [Beerware](https://en.wikipedia.org/wiki/Beerware) \/ [weslleyaraujo](https://weslleyaraujo.github.io/react-simon-says/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Pacman        | [pacman-canvas](https://github.com/platzhersh/pacman-canvas)          | <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Pacman Canvas</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://platzh1rsch.ch" property="cc:attributionName" rel="cc:attributionURL">Platzh1rsch</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/platzhersh/pacman-canvas" rel="dct:source">https://github.com/platzhersh/pacman-canvas</a>.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| SimonSays     | [react-simon-says](https://github.com/weslleyaraujo/react-simon-says) | <a href="https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt">The MIT License (MIT)</a><br />Copyright (c) 2014 Gabriele Cirulli<br />Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br />THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. |

## Running locally (using dev server)

First, make sure you have installed all dependencies of the test application with `npm install`.

Add file named `.env.local` in the project root directory (this directory) on your machine. This file can be used for overriding configuration parameters of [.env](./.env) and to configure this application to run with your 10Duke server deployment. Example content of `.env.local`:

```
REACT_APP_SRV_BASE=https://my-10duke-accounts.example.com
REACT_APP_CLIENT_ID=my-test-client
```

Here, `REACT_APP_SRV_BASE=https://my-10duke-accounts.example.com` points to your 10Duke Identity and Entitlement service. `REACT_APP_CLIENT_ID=my-test-client` specifies id of this this test client, as configured on the 10Duke service.

In the 10Duke service, this test application must be configured as an OAuth client with these details:

- Client id: As configured in `.env.local` (see above)
- OAuth flow: PKCE (Authorization Code Grant flow with Proof Key for Code Exchange), client secret not used
- Login callback URL: `http://localhost:3000/logincb`
- Logout callback URL: `http://localhost:3000/signoutcb`

Now you can run the test client locally using `npm start` (see below).

## Building and publishing Docker image

The project comes with [Dockerfile](./Dockerfile) that can be used for building a Docker image with this application. Some basic commands for building and publishing the image are listed below:

```
# Build the image
docker build -t 10duke/duke-test-client:<version> .

# Tag for publishing to your internal Docker repo
docker tag <imageId> docker-repo.example.com:<port>/10duke/duke-test-client:<version>
docker tag <imageId> docker-repo.example.com:<port>/10duke/duke-test-client:latest

# Push to your internal Docker repo
docker push docker-repo.example.com:<port>/10duke/duke-test-client:<version>
docker push docker-repo.example.com:<port>/10duke/duke-test-client:latest
```

## Using the image

```
# Pull image from your internal Docker repo
docker pull docker-repo.example.com:<port>/10duke/duke-test-client:latest
# Run the image (in HTTPS port 48444)
docker run -d -p 48444:443 docker-repo.example.com:<port>/10duke/duke-test-client:latest
```

## Available Scripts (as initialized by Create React App)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
