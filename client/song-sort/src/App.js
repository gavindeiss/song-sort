import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header/Header';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { PlaylistPopup } from './components/PlaylistPopup/PlaylistPopup';

function App() {
  // TODO: Refactor such that we call useAuth after the button press in Login.js
  // Then, adjust the conditional rendering logic on /home
  let code = new URLSearchParams(window.location.search).get('code');

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={code ? 
            <Navigate to="/home" replace /> : 
            <Login />} /> 
          <Route path="/home" element={<Dashboard />} />
          <Route path="/playlist/:id" element={<PlaylistPopup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App;
