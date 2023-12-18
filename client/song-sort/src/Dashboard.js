import React from "react";
import { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap";
import useAuth from "./backend/useAuth";
import { getUserPlaylists } from "./backend/Playlist";
// const SpotifyWebApi = require("spotify-web-api-node")
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);

    let [playlistData, setPlaylistData] = useState([]);

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
}