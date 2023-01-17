import logo from './logo.svg';
import VerifyLogin from './components/verifyLogin';
import Login from './components/Login';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/verifyLogin" element={<VerifyLogin />} />
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
