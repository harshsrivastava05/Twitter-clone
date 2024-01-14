import React, { useState, useEffect } from 'react';
import './mainprofile.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from './post/post';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../editprofile/editprofile';
import axios from "axios";
import Uselogedinuser from '../../../uselogedinuser/uselogedinuser';
import { useUserAuth } from '../../../context/UserAuthContext';
import { API_LINK } from '../../../context/apilink';

const MainProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [posts, setPosts] = useState([]);
    const [coverImage, setCoverImage] = useState('https://www.proactivechannel.com/Files/BrandImages/Default.jpg');
    const [profileImage, setProfileImage] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');

    const loggedInUser = Uselogedinuser();
    const { user } = useUserAuth();
    const email = user?.email || loggedInUser.email;
    const Username = user?.email?.split('@')[0] || username;
    const googlename = user?.displayName;

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await fetch(`${API_LINK}/logedinuser?email=${email}`);
                const userData = await userResponse.json();
                const userPostsResponse = await fetch(`${API_LINK}/userpost?email=${email}`);
                const userPostsData = await userPostsResponse.json();

                setName(userData.fullname || googlename || '');
                setUsername(userData.username || '');
                setLocation(userData.location || '');
                setWebsite(userData.website || '');
                setCoverImage(userData.coverImage || 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg');
                setProfileImage(userData.profileImage || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');
                setPosts(userPostsData || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [email, googlename]);

    const handleUploadCoverImage = async (e) => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload?key=fd6e9dfa7e37ed742db8e15bb202e08e', formData);
            const url = response.data.data.display_url;

            const userCoverImage = {
                email: email,
                coverImage: url,
            };

            setIsLoading(false);

            if (url) {
                const patchResponse = await axios.patch(`${API_LINK}/userUpdates/${email}`, userCoverImage, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Cover image uploaded:', patchResponse.data);
            }
        } catch (error) {
            console.error('Error uploading cover image:', error);
            window.alert(error);
            setIsLoading(false);
        }
    };

    const handleUploadProfileImage = (e) => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image);

        axios.post("https://api.imgbb.com/1/upload?key=fd6e9dfa7e37ed742db8e15bb202e08e", formData)
            .then(res => {
                const url = res.data.data.display_url;
                setProfileImage(url);

                const userProfileImage = {
                    email: email,
                    profileImage: url,
                };

                setIsLoading(false);

                if (url) {
                    fetch(`${API_LINK}/userUpdates?email=${email}`, {
                        method: "PATCH",
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(userProfileImage),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log('Profile image uploaded:', data);
                        });
                }
            })
            .catch((error) => {
                console.error('Error uploading profile image:', error);
                window.alert(error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
            <h4 className='heading-4'>{Username}</h4>
            <div className='mainprofile'>
                <div className='profile-bio'>
                    <div>
                        <div className='coverImageContainer'>
                            <img src={coverImage} alt="" className='coverImage' />
                            <div className='hoverCoverImage'>
                                <div className="imageIcon_tweetButton">
                                    <label htmlFor='image' className="imageIcon">
                                        {isLoading ? (
                                            <LockResetIcon className='photoIcon photoIconDisabled ' />
                                        ) : (
                                            <CenterFocusWeakIcon className='photoIcon' />
                                        )}
                                    </label>
                                    <input
                                        type="file"
                                        id='image'
                                        className="imageInput"
                                        onChange={handleUploadCoverImage}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='avatar-img'>
                            <div className='avatarContainer'>
                                <img src={profileImage} className="avatar" alt='' />
                                <div className='hoverAvatarImage'>
                                    <div className="imageIcon_tweetButton">
                                        <label htmlFor='profileImage' className="imageIcon">
                                            {isLoading ? (
                                                <LockResetIcon className='photoIcon photoIconDisabled ' />
                                            ) : (
                                                <CenterFocusWeakIcon className='photoIcon' />
                                            )}
                                        </label>
                                        <input
                                            type="file"
                                            id='profileImage'
                                            className="imageInput"
                                            onChange={handleUploadProfileImage}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='userInfo'>
                                <div>
                                    <h3 className='heading-3'>{name || googlename}</h3>
                                    <p className='usernameSection'>@{Username}</p>
                                </div>
                                <EditProfile user={user} loggedInUser={loggedInUser} />
                            </div>
                            <div className='infoContainer' style={{ color: 'black' }}>
                                <p>{loggedInUser.bio || 'No bio'}</p>
                                <div className='locationAndLink' style={{ color: 'black' }}>
                                    <p className='subInfo'><MyLocationIcon /> {location || 'No location'}</p>
                                    <p className='subInfo link'><AddLinkIcon /> {website || 'No website'}</p>
                                </div>
                            </div>
                            <h4 className='tweetsText' style={{ color: 'black' }}>Tweets</h4>
                            <hr />
                        </div>
                        {posts.map((p) => (
                            <Post key={p._id} p={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProfile;
