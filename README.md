Test/Demo client for 10Duke Identity and Licensing services.

All "licensed" views are actually just open source browser games, embedded here as demo content.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
