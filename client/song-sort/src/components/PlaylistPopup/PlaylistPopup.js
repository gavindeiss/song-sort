import Cookies from 'js-cookie';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './PlaylistPopup.css'; 


export const PlaylistPopup = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <Container 
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div>
            <p>Foo Bar</p>
            <p>{id}</p>
            <button onClick={handleButtonClick}>
              Back to Homepage
            </button>
        </div>

    </Container>
  );
};
