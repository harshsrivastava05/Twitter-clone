import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./feed.css";
import Tweetbox from "./tweetbox/tweetbox";
import { API_LINK } from "../../context/apilink";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        fetch(`${API_LINK}/post`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
    }, [posts])

    return (
        <div className="feed">
            <div className="feed__header">
                <h2 style={{color:'#50b7f5'}}>Home</h2>
            </div>
           <Tweetbox />
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
        </div>

    )

}

export default Feed
