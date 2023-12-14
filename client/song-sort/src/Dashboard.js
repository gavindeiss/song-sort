import React from "react";
import { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap";
import useAuth from "./useAuth";
import { getUsername, getUserPlaylists, getUserPlaylistsData } from "./Playlist";
const SpotifyWebApi = require("spotify-web-api-node")

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    let username, playlists, playlistsData;

    let [playlistData, setPlaylistData] = useState([]);

    useEffect(() => {
        if (!accessToken) return;
        getUserPlaylists(accessToken)
            .then(playlists => {
                console.log("Playlists?", playlists)
                const playlistsData = playlists.map(playlist => ({
                    id: playlist.id,
                    name: playlist.name,
                    imageUrl: playlist.images[0].url,
                }));
                setPlaylistData(playlistsData);
                })

        console.log("Not lit", playlistsData);

    }, [accessToken])

    console.log("Pls", playlistData)

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {playlistData.map(playlist => (
              <div
                className="d-flex m-2 align-items-center"
                style={{ cursor: "pointer" }}
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