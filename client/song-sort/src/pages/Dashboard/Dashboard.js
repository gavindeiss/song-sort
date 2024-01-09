import React from "react";
import PlaylistContainer from "../../components/PlaylistContainer/PlaylistContainer";
import useAuth from "../../backend/useAuth";

import Cookies from 'js-cookie';

export default function Dashboard(code) {
    // TODO: More elegantly call useAuth in App.js (see other TODO there)
    let accessToken = useAuth(code);
    accessToken = Cookies.get('accessToken');

    return (
      <PlaylistContainer accessToken={accessToken}/>
    )
}