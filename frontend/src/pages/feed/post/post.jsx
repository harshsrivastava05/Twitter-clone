import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import Uselogedinuser from "../../../uselogedinuser/uselogedinuser";
import { useUserAuth } from "../../../context/UserAuthContext";

function Post({ p }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    const loggedInUser = Uselogedinuser();
    const { user } = useUserAuth();
    const result = user?.email?.split('@')[0];
    const googlename = user?.displayName;

    useEffect(() => {
        async function Name() {
            setName(loggedInUser.fullname)
            setUsername(loggedInUser.username)

        }
        Name();
    }, [loggedInUser])

    const { photo, post, profilePhoto } = p
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src={profilePhoto} />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>{name ? name : googlename}{" "}
                            <span className="post__headerSpecial">
                                <VerifiedUserIcon className="post__badge" /> @{username ? username : result}
                            </span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p style={{ color: 'black', fontWeight: '500' }}>{post}</p>
                    </div>
                </div>
                <img src={photo} alt="" width='500' />
                <div className="post__footer">
                    <ChatBubbleOutlineIcon className="post__footer__icon" fontSize="small" />
                    <RepeatIcon className="post__footer__icon" fontSize="small" />
                    <FavoriteBorderIcon className="post__footer__icon" fontSize="small" />
                    <PublishIcon className="post__footer__icon" fontSize="small" />
                </div>
            </div>
        </div>
    );
}


export default Post;
