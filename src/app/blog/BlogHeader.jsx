"use client"

import React from 'react';
import "./blogheader.css";

const BlogHeader = ({ setSearchQuery }) => {
  return (
    <div className='headerBar'>
      <div className='header'>
        <h1 className='blogheader text-foreground poppins text-2xl font-bold'>
          Smudge's Tech Blog
        </h1>
        <div className='search'>
          <input
            type="text"
            placeholder="Search..."
            className='searchBar'
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} // Convert to lowercase
          />
        </div>
      </div>
      <div className='line' style={{ width: '95%', height: '2px', backgroundColor: 'var(--accent-color)' }}></div>
    </div>
  );
};

export default BlogHeader;
