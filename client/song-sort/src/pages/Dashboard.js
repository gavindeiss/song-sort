import React from "react";
import useAuth from "../backend/useAuth";
import PlaylistContainer from "../components/PlaylistContainer/PlaylistContainer";
// const SpotifyWebApi = require("spotify-web-api-node")

export default function Dashboard({ code }) {
    console.log("Dashboard code: ", code)
    const accessToken = useAuth(code);

    return (
      <PlaylistContainer accessToken={accessToken}/>
    )
}