import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Container } from 'react-bootstrap';


import Login from './pages/Login';
// import TestingRouter from './pages/TestingRouter';
import Dashboard from './pages/Dashboard';
import Header from './components/Header/Header';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <div>
      <Header />
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
  // return (
  //   <Container fluid className="App">
  //     <BrowserRouter>
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<TestingRouter />} />
  //         {/* <Route path="/" element={false ? 
  //                                 (<Navigate to="/home" replace />) : 
  //                                 (<Login />)
  //           } /> */}
  //         {/* <Route path="/home" element={<Dashboard />} /> */}
  //       </Routes>
  //     </BrowserRouter>
  //   </Container>
  // )
}

export default App;
