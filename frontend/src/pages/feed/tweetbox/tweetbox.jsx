import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./tweetbox.css"
import axios from 'axios';
import Uselogedinuser from "../../../uselogedinuser/uselogedinuser";
import { useUserAuth } from "../../../context/UserAuthContext";
import { API_LINK } from "../../../context/apilink";

const Tweetbox = () => {

    const [post, setpost] = useState("")
    const [imageurl, setimageurl] = useState("")
    const [isloading, setisloading] = useState(false)
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    const loggedInUser = Uselogedinuser();
    const { user } = useUserAuth();
    const email = user?.email;
    // console.log(loggedInUser)
    // useEffect(() => {
    //     console.log(loggedInUser)
    // },[loggedInUser])
    const userProfilePic = loggedInUser[0]?.image ? loggedInUser[0]?.image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

    const handletweet = async (e) => {
        e.preventDefault();

        try {
            let userData;

            if (user?.providerData[0]?.providerId === 'password') {
                const res = await axios.get(`${API_LINK}/logedinuser?email=${email}`);
                userData = res.data[0];
            } else {
                userData = loggedInUser[0];
            }

            setName(userData?.fullname);
            setUsername(userData?.username);

            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                photo: imageurl,
                username: username,
                name: name,
                email: email,
            };

            console.log(userPost);

            const res = await axios.post(`${API_LINK}/post`, userPost);
            const data = res.data;
            console.log(data);
        } catch (error) {
            console.error("Error posting tweet:", error);
        } finally {
            setpost('');
            setimageurl('');
        }
    };


    const handleuploadimage = async (e) => {
        const image = e.target.files[0];
        setisloading(true);

        const formdata = new FormData();
        formdata.set('image', image);

        try {
            const res = await axios.post('https://api.imgbb.com/1/upload?key=fd6e9dfa7e37ed742db8e15bb202e08e', formdata);
            setimageurl(res.data.data.display_url);
            console.log(res.data.data.display_url);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setisloading(false);
        }
    };

    return (
        <div className="tweetBox">
            <form onSubmit={handletweet}>
                <div className="tweetBox__input">
                    <Avatar src={loggedInUser[0]?.image ? loggedInUser[0]?.image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        onChange={(e) => setpost(e.target.value)}
                        value={post}
                        required
                    />

                </div>
                <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                        {
                            isloading ? <p>Uploading Image</p> : <p>{imageurl ? 'Image Uploaded' : <AddPhotoAlternateIcon />}</p>
                        }
                    </label>
                    <input
                        type="file"
                        id='image'
                        className="imageInput"
                        onChange={handleuploadimage}
                    />
                    <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
                </div>
            </form>

        </div>
    )
}

export default Tweetbox;
