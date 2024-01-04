import React from "react";
import useAuth from "../backend/useAuth";
import PlaylistContainer from "../components/PlaylistContainer/PlaylistContainer";
// const SpotifyWebApi = require("spotify-web-api-node")

import { useCode } from "../contexts/AuthCodeManager";

export default function Dashboard() {
    const code = useCode().code;
    console.log("Dashboard code: ", code.code)
    const accessToken = useAuth(code);

    return (
      <PlaylistContainer accessToken={accessToken}/>
    )
}