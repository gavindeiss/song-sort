# song-sort

# App Overview

Currently just npm start from client/song-sort and it will direct to localhost, port 3000

# Step-by-step on how to recreate

This project was largely done for my own edification on Flask, React & bootstrap, so I'm writing down step-by-step what I did for my own future reference. But, If you hope to similarly build a simple Spotify app from scratch and are using this app as a starting point, then win-win! Here's what I did, chronologically.

Note: For "Chapter 1" as I'm calling it for some reason, I'd recommend just watching [this](https://www.youtube.com/watch?v=Xcet6msf3eE&t=2058s&ab_channel=WebDevSimplified) video. It will walk you through getting authentification and authorization setup quite clearly. For Chapter 2 onwards, things diverge quite a bit.

# Chapter 1: Initial Setup + Auth

## 1. Creating a Spotify App

- Go to Spotify Developer Dashboard --> Create App
- Most of everything on this page is self explanatory except redirect_uri. Set it to localhost w/ port 3000 for now -- http://localhost:3000/. Eventually if you want to host it at an actual location, you can double back to this step and change it.

## 2. Setting up the Repo

- Create the song-sort repo (or whatever you want to call it)
- Add 2 empty folders: client and server
- cd into client, rn this command to get our react boilerplate:
   `npx create-react-app song-sort`
- You'll see nothing but the boilerplate, but at this point if you'd like to see the app running, cd to client/song-sort and run `npm start`
    - Note: If at any point you close out of the tab and want to run npm start again, you'll likely get the error message that port 3000 is still in use. To remedy this, (1) list the running tasks on port 3000, and (2) kill any.
        - `sudo lsof -i :3000`
        - `sudo kill -9 <PID>`
        - Both in 1: `sudo kill -9 $(lsof -t -i :3000)`

## 3. Authorization

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

## 4. Authentication 

To make things a bit easier, it's recommended you lean on [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) for this authentication. Here's how to get started on that

- cd into the server folder and...
    - Create a file called server.js
    - run npm init -y to create a package.json file (similar to requirements.txt, but for node dependencies rather than python/ pip)
    - install spotify-web-api-node
        - Check package.json & package-lock.json to ensure both appear under dependencies
    - Finish the login route of server.py, making a simple shell for our app to authorize that we have a code and return an access token & refresh token if so
    - Setup Dashboard.js with just a simple div printing the code to ensure it works
    - Finish useAuth.js
    - Add the devStart script to server/package.json. runable from server folder with 
        - `npm run devStart` 
        - You may need to install nodemon first: `npm i nodemon -G`
        - Note: You can also literally just run `nodemon server.js`, not sure why it's industry practice to make a 'script' for one liners like this.

# Chapter 2: Implementing the Core Functionality

Everything should be setup for your app to be 'running' at this point, there's just not much of anything happening. Let's change that.

## 1. Collecting & Displaying a user's playlists

Step 5 concerns the very initial frontend & backend work you'll need to tackle to hit the spotify API for a user's playlists, and to actually display them on our main dashboard.

## Backend

Check out `public/src/backend/Playlist.js`, specifically the `getUserPlaylists` function. You'll see a pretty standard GET request returning a Promise of all a user's playlist objects. Next, go to Dashboard.js to see how we handle this promise and which fields we extract. It's the first useEffect(), or cntrl + f for the comment `// Collect Playlist Data`. The short of it though is that we're interested in these fields:
    - id: playlist.id
    - name: playlist.name
    - description: playlist.description
    - imageUrl: playlist.images[0].url
    - numTracks: playlist.tracks.total
    - tracksUrl: playlist.tracks.href

Most important is just the final one, tracksUrl, which will allow us to retrieve all the tracks that we want to sort for the user. All of the others are acutally just UI nicities.

## Frontend

That little bit of backend work out of the way, you'll want to display some of those other fields in a scrolling list, like the images of all the playlists & their names.

We can just stuff them in a Container and return them in our Dashboard component. The code in the final repo will likely look quite different from what you'll want to do at this step -- here's what I had at the time:

```
return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {playlistData.map(playlist => (
              <div
                className="d-flex m-2 align-items-center"
                style={{ cursor: "pointer" }}
                key={playlist.key}
                // onClick={handlePlay}
                >
                <img src={playlist.imageUrl} style={{ height: "64px", width: "64px" }} />
                <div className="ml-3" style={{ paddingLeft: "10px" }}>
                    <div>{playlist.name}</div>
                    {playlist.description !== "" && (
                        <div className="text-muted">{playlist.description}</div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      )
```

## Chapter 2: Making a Popout Component

# Links

- [Spotify Dev Dashboard home](https://developer.spotify.com/dashboard/c210eb594ef84fd89c0860fd21069318)

