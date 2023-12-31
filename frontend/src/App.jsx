import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import { Signup } from "./pages/signup/signup";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import { Loader } from "./pages/loader";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth)
  console.log("user:", user);
  console.log("loading:", loading);

  if (loading) {
    return <Loader />
  }
  if (!user) {
    return <Navigate to={'/login'} />
  }
  return children;
}

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loader" element={<Loader />} />
          <Route />
          <Route />
        </Routes>
      </Router>
    </div>
  )
}

export default App
