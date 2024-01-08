import React from "react";
import { useNavigate } from "react-router-dom";


export const Playlist = ({playlistPayload}) => {

    const navigate = useNavigate();

    const handlePlaylistClick = (playlistPayload) => {
        console.log(playlistPayload.id);
        navigate(`/playlist/${playlistPayload.id}`, { replace: true });
      };

    return (
        <div className="d-flex m-2 align-items-center"
             style={{ cursor: "pointer" }}
             key={playlistPayload.key}
             onClick={handlePlaylistClick} 
        >
            <img src={playlistPayload.imageUrl} style={{ height: "64px", width: "64px" }} />
            <div className="ml-3" style={{ paddingLeft: "10px" }}>
                <div style={{ color: '#000000' }}>{playlistPayload.name} </div>
                {playlistPayload.description !== "" && (
                    <div style={{ color: '#444444', fontSize: 12 }}>{playlistPayload.description}</div>
                )}
            </div>
        </div>
    )
}