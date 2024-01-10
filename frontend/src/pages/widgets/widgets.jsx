import React from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
  TwitterShareButton, TwitterHashtagButton
} from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2 style={{color:'black'}}>What's happening</h2>

        <TwitterTweetEmbed tweetId={"1557187138352861186"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 400 }}
        />
        <TwitterTweetEmbed
          tweetId={'933354946111705097'}
        />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="saurabhnemade"
          options={{ height: 400 }}
        />


      </div>
    </div>
  );
}

export default Widgets;
