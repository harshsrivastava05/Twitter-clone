import React from "react";
import './sideoptions.css';

const Sideoptions = ({ active, text, Icon }) => {
  return (
    <div className={`sideoptions ${active && 'sideoptions_active'}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
};

export default Sideoptions;
