import Feed from "../feed/feed";
import Sidebar from "../sidebar/sidebar";
import Widgets from "../widgets/widgets";


const Home = () => {
    return(
       <div>
        <Sidebar/>
        <Feed/>
        <Widgets/>
       </div>
    )
}

export default Home;
