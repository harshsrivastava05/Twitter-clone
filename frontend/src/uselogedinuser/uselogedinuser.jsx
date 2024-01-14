import { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import axios from "axios";
import { API_LINK } from "../context/apilink";

function Uselogedinuser() {
    const { user } = useUserAuth(); 
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API_LINK}/logedinuser?email=${email}`);
                const data = res.data;
                setLoggedInUser(data);
            } catch (error) {
                console.error("Error fetching logged-in user:", error);
            }
        }
        fetchData();
        
    }, [email]);

    return loggedInUser;
};

export default Uselogedinuser;
