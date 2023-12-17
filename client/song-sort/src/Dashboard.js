import React from "react";
import { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap";
import useAuth from "./useAuth";
import { getUserPlaylists } from "./Playlist";
// const SpotifyWebApi = require("spotify-web-api-node")
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);

    let [playlistData, setPlaylistData] = useState([]);

    useEffect(() => {
        if (!accessToken) return;
        getUserPlaylists(accessToken)
            .then(playlists => {
                console.log("Swag", playlists);
                const playlistsData = playlists.map(playlist => ({
                    id: playlist.id,
                    name: playlist.name,
                    imageUrl: playlist.images[0].url,
                    key: uuidv4(),
                }));
                setPlaylistData(playlistsData);
                })

    }, [accessToken])

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
                <div className="ml-3">
                    <div>{playlist.name}</div>
                    <div className="text-muted">{playlist.id}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )
}