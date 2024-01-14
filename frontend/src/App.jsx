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
import Feed from "./pages/feed/feed";
import Bookmark from "./pages/bookmarks/bookmark";
import Explore from "./pages/explore/explore";
import List from "./pages/list/list";
import Message from "./pages/Messages/message";
import More from "./pages/more/more";
import Notification from "./pages/notification/notification";
import Profile from "./pages/profile/profile";
import Tweetbox from "./pages/feed/tweetbox/tweetbox";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {

  return (
    <div className="app">
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
              <Route index element={<Feed />} />
            </Route>
            <Route path="*" element={< Navigate to="/" />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} >
              <Route path="feed" element={<Feed />} />
              <Route path="bookmark" element={<Bookmark />} />
              <Route path="explore" element={<Explore />} />
              <Route path="list" element={<List />} />
              <Route path="messages" element={<Message/>} />
              <Route path="more" element={<More />} />
              <Route path="notification" element={<Notification />} />
              <Route path="profile" element={<Profile />} />
              <Route path="tweet" element={<Tweetbox />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/loader" element={<Loader />} />
            <Route />
            <Route />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  )
};

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

export default App;
