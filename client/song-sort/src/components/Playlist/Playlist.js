import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Playlist = ({playlistPayload}) => {


    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const navigate = useNavigate();

    const handlePlaylistClick = (playlistPayload) => {
        console.log("clicked", playlistPayload);
        console.log(playlistPayload.id);
        setSelectedPlaylist(playlistPayload);
        setPopupVisibility(true);
        //navigate('/TestRouting');
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
                <div>{playlistPayload.name}</div>
                {playlistPayload.description !== "" && (
                    <div className="text-muted">{playlistPayload.description}</div>
                )}
            </div>
        </div>
    )
}