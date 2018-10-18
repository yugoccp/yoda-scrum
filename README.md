# Yoda Scrum
Daily Stand-up Meeting timer with Star Wars theme made for [Hacktoberfest](https://hacktoberfest.digitalocean.com/) :)

## Development
Before run the app, install dependencies for both /frontend and /backend projects:

    npm i

To run the dev environment run the following

    npm run start:dev

This above command will start a Webpack-Dev-Server to serve frontend app and the ExpressJS API server.
Webpack-Dev-Server is configured to redirect every request to api/* and /socket.io/* to API server.

## Libraries
#### Backend
* ExpressJS
* SocketIO

#### Frontend
* Webpack
* React
* React-Redux
* AntD
* SocketIO-Client
