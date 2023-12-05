# song-sort

- Spotify Dev Dashboard home: https://developer.spotify.com/dashboard/c210eb594ef84fd89c0860fd21069318


# App Overview

Currently just npm start from client/song-sort and it will direct to localhost, port 3000

# Step-by-step on how to recreate

This project was largely done for my own edification on Flask & React, so I'm writing down step-by-step what I did for my own future reference. But, If you hope to similarly build a simple Spotify app from scratch and are using this app as a starting point, then win-win! Here's what I did, chronologically.

## Setting up the Repo

- I created the song-sort repo
- Added 2 empty folders: client and server
- Spun up a venv pre-emptively
- cd into client, ran this command to get our react boilerplate:
    npx create-react-app song-sort
- You'll see nothing but the boilerplate, but at this point if you'd like to see the app running, cd to client/song-sort and run:
    npm start