# Requirements

- [Git](https://git-scm.com/)
- [Node 10+](https://nodejs.org/)
- [Yarn](https://yarnpkg.com)

# Getting started

Both `server` and `web` folders are independent npm packages, so you can work separately with their own `package.json` scripts to facilitate the process of development.

## Quick start

After cloning this repository, run `yarn install` on the project root folder to install all npm dependencies.

Run `yarn build` to build a production version of the app and `yarn start` to start it.

If you want to run all projects test, use `yarn test`.

# Used technologies and tools

- [Typescript](https://www.typescriptlang.org/) as main programming language
- [Prettier](https://prettier.io/) for code formatting
- [CircleCI](https://circleci.com/) for continuous integration
- Server
  - [Express](https://expressjs.com/) for the REST API server
  - [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) for testing
- Web client
  - [React](https://reactjs.org/) for UI
  - [styled-components](https://styled-components.com/) for CSS and styling
  - [react-router](https://reacttraining.com/react-router/web) for routing
  - [Jest](https://jestjs.io/) for testing
  - [ducks](https://github.com/erikras/ducks-modular-redux) methodology for separation of concearns regarding the app login
    > We are not really using the Redux dependency in this app but just the `useReducer` React hook. Since it has the same concepts of reducing state and dispatching actions of Redux, the ducks methodology still aplies.

# Developing

Use `yarn start` inside both `server` and `web` folders to start a development server.

# Testing

We use [Jest](https://jestjs.io/) for testing. The tests files are places in the same folder of their target files, inside a `__tests__` folder, with the same name of the target file and a `.test.[extension]` suffix.

Use `yarn test --watch` inside both `web` and `server` folders to start Jest in watch mode.
