import React, { useEffect, useState } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import './sidebar.css';
import Sideoptions from "./sideoptions";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Customlink from "./customlink";
import Uselogedinuser from "../../uselogedinuser/uselogedinuser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ handlelogout, user }) => {
    const [anchorEl, setanchorE1] = useState(null)
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    const openmenu = Boolean(anchorEl)
    const loggedInUser = Uselogedinuser();
    const navigate = useNavigate();
    const result = user?.email?.split('@')[0];
    const googlename = user?.displayName
// console.log( user?.displayName)
    const sideoptions = [
        {
            icon: HomeRoundedIcon,
            name: 'Home',
            link: 'feed'
        },
        {
            icon: SearchIcon,
            name: 'Explore',
            link: 'explore'
        },
        {
            icon: NotificationsIcon,
            name: 'Notification',
            link: 'notification'
        },
        {
            icon: MailIcon,
            name: 'Messages',
            link: 'messages'

        },
        {
            icon: FeaturedPlayListIcon,
            name: 'List',
            link: 'list'
        },
        {
            icon: BookmarkIcon,
            name: 'Bookmarks',
            link: 'bookmark'
        },
        {
            icon: PersonIcon,
            name: 'Profile',
            link: 'profile'
        },
        {
            icon: MoreHorizIcon,
            name: 'More',
            link: 'more'
        }
    ];
    useEffect(() => {
        async function Name(){
           setName(loggedInUser.fullname) 
           setUsername(loggedInUser.username)
        }
        Name();
    },[loggedInUser])

    const handleclick = (e) => {
        setanchorE1(e.currentTarget)
    }

    const handleclose = () => {
        setanchorE1(null)
    }



    return (
        <div className="sidebar">
            <Link to={'/home/feed'}>
                <TwitterIcon className="sidebar_twittericon" />
            </Link>
            <div>
                {sideoptions.map(({ icon, name, link }) => (
                    <Customlink to={`/home/${link}`}>
                        <Sideoptions key={name} Icon={icon} text={name} />
                    </Customlink>

                ))}
                <Link to='/home/tweet'>
                    <Button variant="outlined" className="sidebar_tweet">
                        Tweet
                    </Button>
                </Link>
                <div className="Profile_info">
                    <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
                    <div className="User_info" style={{ color: 'black' }}>
                        <h4> {name? name:googlename }</h4>
                        <h5>@{username? username : result}</h5>
                    </div>
                    <IconButton
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={openmenu ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openmenu ? "true" : undefined}
                        onClick={handleclick}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu id="basic-menu"
                        anchorEl={anchorEl}
                        open={openmenu}
                        onClick={handleclose}
                        onClose={handleclose}
                    >
                        <MenuItem className="profile_info1" onClick={() => navigate('/home/profile')}>
                            <Avatar className="avatar" src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} >

                            </Avatar>
                            <div className="user_info subUser_info">
                                <div>
                                    <h4>{name? name:googlename}</h4>
                                    <h5>@{username? username : result}</h5>
                                </div>
                                <ListItemIcon className="done_icon"><DoneIcon /></ListItemIcon>
                            </div>
                        </MenuItem>

                        <Divider />
                        <MenuItem onClick={handleclose}>Add an existing account</MenuItem>
                        <MenuItem onClick={handlelogout}>Log out @{username? username : result}</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
