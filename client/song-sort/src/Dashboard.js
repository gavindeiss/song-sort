import React from "react";
import useAuth from "./useAuth";
import { getUsername, getUserPlaylists, getUserPlaylistsData } from "./Playlist";
const SpotifyWebApi = require("spotify-web-api-node")

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    var username, playlists, playlistsData;

    if (!accessToken) return;
    const spotifyApi = new SpotifyWebApi(
        {
            clientId: 'c210eb594ef84fd89c0860fd21069318',
            clientSecret: 'bf2ffd7d34ce4c7b8179fffc8da00f14',
            redirectUri: 'http://localhost:3000',
            accessToken
        }
    );

    username = getUsername(spotifyApi);
    playlists = getUserPlaylists(accessToken);
    playlistsData = getUserPlaylistsData(accessToken);
    console.log("no lie", playlistsData);
}