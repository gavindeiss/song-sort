import React from "react";
import PlaylistContainer from "../components/PlaylistContainer/PlaylistContainer";

import Cookies from 'js-cookie';

export default function Dashboard() {
    const accessToken = Cookies.get('accessToken');

    return (
      <PlaylistContainer accessToken={accessToken}/>
    )
}