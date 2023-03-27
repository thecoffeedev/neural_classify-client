import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./assets/react.svg";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Upload from "./components/Upload";
import Uploads from "./components/Uploads";
import PrivateRoutes from "./utils/PrivateRoutes";
import { UserProvider } from "./utils/userContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/predict" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/uploads" element={<Uploads />} />
            {/* </Route> */}
            <Route path="/" element={<Landing />} exact />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
