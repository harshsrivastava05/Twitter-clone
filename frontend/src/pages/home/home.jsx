import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import Widgets from "../widgets/widgets";
import { Divider } from "@mui/material";
import { useUserAuth } from "../../context/UserAuthContext";

const Home = () => {

    const { logOut } = useUserAuth();
    const navigate = useNavigate();
    const handlelogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="app">
            <Sidebar handlelogout={handlelogout}  />
            <Divider />
            <Outlet />
            <Divider />
            <Widgets />
        </div>
    )
}

export default Home;
