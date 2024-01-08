import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Playlist } from "../Playlist/Playlist";
import { getUserPlaylists } from "../../backend/CollectPlaylistData"; 

export default function PlaylistContainer({ accessToken }) {
  const [playlistData, setPlaylistData] = useState(null);

  // Collect Playlist Data
  useEffect(() => {
    if (!accessToken) return;

    getUserPlaylists(accessToken)
      .then((playlists) => {
        const playlistsData = playlists.map((playlist) => ({
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
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, [accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      {playlistData === null ? ( // Check if data is still loading
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {playlistData.map((playlistPayload) => (
            <Playlist
              playlistPayload={playlistPayload}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
