import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login/Login';
import Dashboard from './Dashboard';
import Header from './components/Header/Header';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <div>
      <Header />
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;
