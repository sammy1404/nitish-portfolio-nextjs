import React from 'react'
import "./blogheader.css"

const BlogHeader = () => {
  return (
    <>
    <div className='header'>
        <h1 className='blogheader text-foreground poppins text-2xl font-bold'>Smudge's tech blog</h1>
        <div className='search'>
          <input type="text" placeholder="Search..." className='searchBar'/>
        </div>    
    </div>
    <div className='line' style={{width: '95%', height: '2px', backgroundColor: 'var(--accent-color)'}}></div>
    </>
  )
}

export default BlogHeader