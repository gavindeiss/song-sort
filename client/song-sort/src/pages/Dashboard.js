import React from "react";
import useAuth from "../backend/useAuth";
import PlaylistContainer from "../components/PlaylistContainer/PlaylistContainer";
// const SpotifyWebApi = require("spotify-web-api-node")

import Cookies from 'js-cookie';

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const accessToken2 = Cookies.get('accessToken');
    console.log("accessToken2", accessToken2);
    console.log("accessToken", accessToken);

    return (
      <PlaylistContainer accessToken={accessToken2}/>
    )
}