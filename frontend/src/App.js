import NoteState from './context/Notestate';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Navbar from './component/Navbar';
import About from "./component/about"
import Home from "./component/home"
import User from './component/User';
import Alert from './component/Alert';
import Signup from './component/signup';
import Log from './component/Log';
function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <div>

      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home showalert={showalert} />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/login" element={<Log showalert={showalert} />} />
            <Route exact path="/signup" element={<Signup showalert={showalert} />} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
