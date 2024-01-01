import React, { useState } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import './sidebar.css';
import Sideoptions from "./sideoptions";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";

const Sidebar = ({ handlelogout, user }) => {
    const [anchorEl, setanchorE1] = useState(null)
    const openmenu = Boolean(anchorEl)

    const sideoptions = [
        {
            icon: HomeRoundedIcon,
            name: 'Home'
        },
        {
            icon: SearchIcon,
            name: 'Explore'
        },
        {
            icon: NotificationsIcon,
            name: 'Notification'
        },
        {
            icon: MailIcon,
            name: 'Messages'
        },
        {
            icon: FeaturedPlayListIcon,
            name: 'List'
        },
        {
            icon: BookmarkIcon,
            name: 'Bookmarks'
        },
        {
            icon: PeopleIcon,
            name: 'Comunities'
        },
        {
            icon: PersonIcon,
            name: 'Profile'
        },
        {
            icon: MoreHorizIcon,
            name: 'More'
        }
    ];

    const handleclick = (e) => {
        setanchorE1(e.currentTarget)
    }

    const handleclose = () => {
        setanchorE1(null)
    }

    // const handlelogout = () => {

    // }

    return (
        <div className="sidebar">
            <TwitterIcon className="sidebar_twittericon" />
            <div>
                {sideoptions.map(({ icon, name }) => (
                    <Sideoptions key={name} Icon={icon} text={name} />
                ))}
                <Button variant="outlined" className="sidebar_tweet">
                    Tweet
                </Button>
                <div className="Profile_info">
                    <Avatar src={AccountCircleIcon} />
                    <div className="User_info">
                        <h4>Harsh</h4>
                        <h5>@harsh07</h5>
                    </div>
                    <IconButton
                        size="small"
                        sx={{ ml: 2, color: "white" }}
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
                        <MenuItem className="profile_info1">
                            <Avatar src={AccountCircleIcon} />
                            <div className="user_info subUser_info">
                                <div>
                                    <h4>Harsh</h4>
                                    <h5>@harsh07</h5>
                                </div>
                                <ListItemIcon className="done_icon"><DoneIcon /></ListItemIcon>
                            </div>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleclose}>Add an existing account</MenuItem>
                        <MenuItem onClick={handlelogout}>Log out</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
