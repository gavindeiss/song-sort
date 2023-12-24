import React from 'react';
import './PlaylistPopup.css'; 

export const PlaylistPopup = ({ onClose, children }) => {
    console.log("Yo comeon")
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
