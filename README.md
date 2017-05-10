# Simple chat demo"

A simple React and Redux chat client demo

## Getting started

- Clone or download the repo
- Start dev with `npm start`
- Visit `localhost:3000`

## Scripts

This project uses npm scripts:

- `test`: launch the test (`jest`) (no test written yet)
- `lint`: lint the `js`, `jsx`, `css` and `scss`
- `build`: launch the build (`webpack`)
- `deploy`: deploy the build folder on remote/gh-pages
- `clean`: remove the build and coverage folder
- `start`: launch the `webpack-dev-server`

## Features

- [x] Real time chat (same window)
- [x] Unlimited number of post
- [x] Unlimited number of users
- [x] Auto scroll to new messages (expect if user has scroll up)
- [x] Messages support markdown
- [x] Messages support emojis (`:heart:`)
- [x] Emojis panel with search
- [x] User can leave chat
- [x] Information when a user join or leave the chat

## To improve

- [ ] Write tests
- [ ] Split components (especially `Client.jsx`)
- [ ] Add am "unread messages" notification if user scroll up
- [ ] Use a node server to allow real chat on different windows
- [ ] Save history in database
- [ ] Be a11y complient

## Stack

This project uses:

- [Yarn](https://yarnpkg.com/)
- [Webpack 2](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [Scss](http://sass-lang.com/)
- [Postcss](http://postcss.org/) ([autoprefixer](https://github.com/postcss/autoprefixer))
- [Jest](https://facebook.github.io/jest/) (no test written yet)
- [Enzyme](http://airbnb.io/enzyme/) (no test written yet)
- [Eslint](http://eslint.org/) ([airbnb](https://www.npmjs.com/package/eslint-config-airbnb))
- [Stylelint](https://stylelint.io/)
- [Travis CI](https://travis-ci.org/)
- [Codecov](https://codecov.io)


## Licence

MIT © 2016-present Renaud Tertrais
