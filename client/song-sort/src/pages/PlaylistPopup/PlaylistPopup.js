import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import TracklistContainer from '../../components/TracklistContainer/TracklistContainer';
import './PlaylistPopup.css'; 


export const PlaylistPopup = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home');
  };

  return (
    <Container 
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div className="popup-content">
            <p>Foo Bar</p>
            <p>{id}</p>
            <Button variant="contained" className="close-button" onClick={handleButtonClick} >
              Back to Homepage
            </Button>
        </div>
        <TracklistContainer/>

    </Container>
  );
};
