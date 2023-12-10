# song-sort

# App Overview

Currently just npm start from client/song-sort and it will direct to localhost, port 3000

# Step-by-step on how to recreate

This project was largely done for my own edification on Flask, React & bootstrap, so I'm writing down step-by-step what I did for my own future reference. But, If you hope to similarly build a simple Spotify app from scratch and are using this app as a starting point, then win-win! Here's what I did, chronologically.

## Creating a Spotify App

- Go to Spotify Developer Dashboard --> Create App
- Most of everything on this page is self explanatory except redirect_uri. Set it to localhost w/ port 3000 for now -- http://localhost:3000/. Eventually if you want to host it at an actual location, you can double back to this step and change it.

## Setting up the Repo

- Create the song-sort repo (or whatever you want to call it)
- Add 2 empty folders: client and server
- cd into client, rn this command to get our react boilerplate:
   `npx create-react-app song-sort`
- You'll see nothing but the boilerplate, but at this point if you'd like to see the app running, cd to client/song-sort and run `npm start`
    - Note: If at any point you close out of the tab and want to run npm start again, you'll likely get the error message that port 3000 is still in use. To remedy this, (1) list the running tasks on port 3000, and (2) kill any.
        - `sudo lsof -i :3000`
        - `sudo kill -9 <PID>`

## Authorization
#### Login auth url, rendering button

For more information on spotify's authorization flow, check [this link](https://developer.spotify.com/documentation/web-api/tutorials/code-flow). In short though, we need to create an auth url with proper scopes for our user to be able to create playlists. Here are the steps to do so:

- Create a new file under src, Login.js
- Create an auth url with the following:
    - client_id: You can retrieve this from dashboard --> <your app> --> Settings --> basic information. It would be best practice to set it in a .env file, AWS secrets manager, etc. but it's actually public so you hard-code it in the link for now.
    - response_type: Set this to code, as you should for all spotify web apps
    - redirect_uri: http://localhost:3000 for now
    - state: A random string, for security. "This provides protection against attacks such as cross-site request forgery."
    - scope: App permissions, such as to be able to create a playlist on a user's profile. Full list of scopes are on [this page](https://developer.spotify.com/documentation/web-api/concepts/scopes)
- Now to actually render some non-boilerplate. Install bootstrap & react-bootstrap if this is your first project and don't have them already. 
    npm i bootstrap react-bootstrap
- Files you'll want to:
    - Write Login.js, rendering the button to login
    - App.js (remove the boilerplate, return just login that you import from Login.js)
    - Delete unnecessary files -- app.css, index.css, logo.svg...

## Authentication 
#### Setting up Login Route

To make things a bit easier, it's recommended you lean on [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) for this authentication. Here's how to get started on that

- cd into the server folder and...
    - Create a file called server.js
    - run npm init -y to create a package.json file (similar to requirements.txt, but for node dependencies rather than python/ pip)
    - install spotify-web-api-node
        - `npm i express spotify-web-api-node`
        - Check package.json & package-lock.json to ensure both appear under dependencies
    - Finish the login route of server.py, making a simple shell for our app to authorize that we have a code and return an access token & refresh token if so
    - Setup Dashboard.js with just a simple div printing the code to ensure it works
    - Finish useAuth.js
    - Add the devStart script to server/package.json. runable from server folder with 
        - `npm run devStart`
        - May beed to install nodemon first: `npm i nodemon -G`


## Links

- [Spotify Dev Dashboard home](https://developer.spotify.com/dashboard/c210eb594ef84fd89c0860fd21069318)

