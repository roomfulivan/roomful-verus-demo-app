import logo from './logo.svg';
import Login from './components/Login';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
