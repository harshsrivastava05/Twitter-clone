import React, { useState, useEffect } from 'react';
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import Uselogedinuser from '../../../../uselogedinuser/uselogedinuser';
import "./post.css"
import { API_LINK } from '../../../../context/apilink';

function Post({ p }) {
  const loggedInUser = Uselogedinuser();
  const [name, setName] = useState('');
  const [username, setUsername] = useState(' ');
  const email = loggedInUser?.email;
  const profileImage = loggedInUser?.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_LINK}/userpost?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [email])

  useEffect(() => {
    setName(loggedInUser.fullname || '');
    setUsername(loggedInUser.username || '');
  }, [loggedInUser])

  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={profileImage} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" /> @{username}
              </span>
            </h3>
          </div>
          <div style={{color:'black'}} className="post__headerDescription">
            <p>{p?.post}</p>
          </div>
        </div>
        {p?.photo && <img src={p.photo} alt="" width='500' />}
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
