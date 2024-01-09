import { Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { getUserTracklist } from "../../backend/CollectPlaylistData"; 

export default function TracklistContainer() {
    const accessToken = Cookies.get('accessToken');
    const tracklistUrl = Cookies.get('tracklistLink')

    const [tracks, setTracks] = useState(null);

    if (!accessToken) return;

    getUserTracklist(accessToken, tracklistUrl)
        .then((tracks) => {console.log(tracks)})

    return(
        <div>Hey howdy</div>
    )
}