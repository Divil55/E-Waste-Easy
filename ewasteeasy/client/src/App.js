import About from "./components/About";
import Blogs from "./components/Blogs";
// import Edumpers from "./components/Edumpers";
import Home from "./components/Home";
import Points from "./components/Points";
import Error from "./components/Error";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserSignup } from "./components/UserSignup";
import { DealerSignup } from "./components/DealerSignup";
import Dispose from "./components/Dispose";
import { Dashboard } from "./components/Dashboard";
import { PickupRequests } from "./components/PickupRequests";
import { DropRequests } from "./components/DropRequests";
import { Extraction } from "./components/Extraction";
import { Status } from "./components/Status";
import { UserProfile } from "./components/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/points" element={<Points />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/dealersignup" element={<DealerSignup />} />
        <Route path="/dispose" element={<Dispose />} />
        <Route path="/status" element={<Status />} />
        <Route path="/dealer/dashboard" element={<Dashboard />} />
        <Route path="/dealer/pickuprequests" element={<PickupRequests />} />
        <Route path="/dealer/droprequests" element={<DropRequests />} />
        <Route path="/dealer/metal-extraction" element={<Extraction />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
