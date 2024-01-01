import Feed from "../feed/feed";
import Sidebar from "../sidebar/sidebar";
import Widgets from "../widgets/widgets";


const Home = () => {
    return(
       <div className="app">
        <Sidebar handlelogout={handlelogout} user={user}/>
        <Feed/>
        <Widgets/>
       </div>
    )
}

export default Home;
