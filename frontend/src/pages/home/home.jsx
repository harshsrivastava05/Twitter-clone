import { signOut } from "firebase/auth";
import Feed from "../feed/feed";
import Sidebar from "../sidebar/sidebar";
import Widgets from "../widgets/widgets";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";



const Home = () => {

    const user = useAuthState(auth)

    const handlelogout = () => {
        signOut(auth)
    }

    return (
        <div className="app">
            <Sidebar handlelogout={handlelogout} user={user} />
            <Feed />
            <Widgets />
        </div>
    )
}

export default Home;
