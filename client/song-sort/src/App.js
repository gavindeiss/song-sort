import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header/Header';

import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard';
import { PlaylistPopup } from './pages/PlaylistPopup/PlaylistPopup';
import useAuth from './backend/useAuth';

function App() {
  // TODO: Refactor such that we call useAuth after the button press in Login.js
  // Then, adjust the conditional rendering logic on /home
  let code = new URLSearchParams(window.location.search).get('code');
  let accessToken = useAuth(code);

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={accessToken ? 
            <Navigate to="/home" replace /> : 
            <Login />} /> 
          <Route path="/home" element={<Dashboard code={code}/>} />
          <Route path="/playlist/:id" element={<PlaylistPopup />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App;
