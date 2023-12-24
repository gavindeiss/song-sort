import React from "react";


export const Playlist = ({playlistPayload}) => {
    return (
        <div className="d-flex m-2 align-items-center"
             style={{ cursor: "pointer" }}
             key={playlistPayload.key}
             // onClick={handlePlay} 
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