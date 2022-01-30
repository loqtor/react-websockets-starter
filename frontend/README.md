# MoH - RAT Catcher

This repository contains the code for MoH - RAT Catcher project. RAT Catcher consists of

1. A dashboard that shows the tests that'd be taking place at a certain facility with their status and the ability to start them.
2. A form to create the tests. Through the form information from the patient is entered together with the test they will be taking and their result once it's done.

## Brief on technology

It consists of a Create React App that hooks up with a WebSockets server, currently developed in Node.

The intention is for this to be deployed to AWS and use API Gateway for handling WebSockets (to be tested).

## Main tools

1. Create React App.
2. Socket IO

## Websockets POC - General architecture

### Main considerations

- Each facility will only have access to the tests that are taking place there. So, the sockets should only emit the tests for a facility under that facility connection.

### Components

The Web Sockets connection is handled with a React hook named `useWebSockets`.

The hook receives an object with the following properties:

1. `events`: The events that are going to be listened for from the server with the callbacks for each. The events come from an enum defined in `useWebSockets`.
2. `query`: Parameters to be passed to the server when connecting from the frontend. In the case of this application, the `facilityId` is passed as a parameter to be used to create a specific "channel" (_room_ in SocketIo language) for that facility in the server. Every subsequent connection from that facility will be managed in the same "channel".

There's four more hooks for interaction with a rest API for:

1. `useFacility`: This one allows to fetch the facility details.
2. `useFacilityTests`: Gets the tests for a certain facility.
3. `useSubmitFacilityTest`: To create a test in the server.
4. `useUpdateFacilityTestStatus`: To update a test in a facility (i.e.: update its status, submit its result).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
