import React from "react";
import { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap";
import useAuth from "./backend/useAuth";
import { getUserPlaylists } from "./backend/CollectPlaylistData";
import { Playlist } from "./components/Playlist/Playlist"
// const SpotifyWebApi = require("spotify-web-api-node")
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [isPopupVisible, setPopupVisibility] = useState(false);

    let [playlistData, setPlaylistData] = useState([]);

    // Collect Playlist Data
    useEffect(() => {
        if (!accessToken) return;
        getUserPlaylists(accessToken)
            .then(playlists => {
                const playlistsData = playlists.map(playlist => ({
                    id: playlist.id,
                    name: playlist.name,
                    description: playlist.description,
                    imageUrl: playlist.images[0].url,
                    numTracks: playlist.tracks.total,
                    tracksUrl: playlist.tracks.href,
                    key: uuidv4(),
                }));
                setPlaylistData(playlistsData);
                })

    }, [accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {playlistData.map(playlistPayload => (
              <Playlist key={playlistPayload.key} playlistPayload={playlistPayload} />
            ))}
          </div>
        </Container>
      )
}