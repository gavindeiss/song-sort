import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { useEffect } from 'react';


import Login from './pages/Login';
import TestRouting from './pages/TestRouting';
import Dashboard from './pages/Dashboard';
import Header from './components/Header/Header';

function App() {
  let code = new URLSearchParams(window.location.search).get('code');

  // return (
  //   <div>
  //     <Header />
  //     {code ? <Dashboard code={code} /> : <Login />}
  //   </div>
  // );


  console.log('Code:', code);

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/TestRouting" element={<TestRouting />} />
          <Route path="/" element={code ? 
            <Navigate to="/home" replace /> : 
            <Login />} /> 
          {/* <Route path="/" element={<Login />} />  */}
          <Route path="/home" element={<Dashboard code={code} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App;
