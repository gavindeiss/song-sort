import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

//import { useEffect } from 'react';

import Header from './components/Header/Header';

import Login from './pages/Login';
import TestRouting from './pages/TestRouting';
import Dashboard from './pages/Dashboard';
import { PlaylistPopup } from './components/PlaylistPopup/PlaylistPopup';
import { CodeProvider } from './contexts/AuthCodeManager';
//import { useCode } from './contexts/AuthCodeManager';

function App() {
  // let code = new URLSearchParams(window.location.search).get('code');

  console.log("swag");

  return (
    
      <Container fluid className="App">
        <BrowserRouter>
          <CodeProvider>
            <Header />
            <Routes>
              <Route path="/TestRouting" element={<TestRouting />} />
              {/* <Route path="/" element={code ? 
                <Navigate to="/home" replace /> : 
                <Login />} />  */}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/playlist/:id" element={<PlaylistPopup />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CodeProvider>
        </BrowserRouter>
      </Container>
  )
}

export default App;
