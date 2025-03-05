import React from 'react'
import "./blogheader.css"
import "../../app/globals.css"
import BlogHeader from "./BlogHeader"
import BlogContent from "./BlogContent"
import ThemeButton from '../components/themeButton'


const Page = () => {
  return (
    <div className='flex flex-col'>
    <ThemeButton />
    <BlogContent />
    </div>
  )
}

export default Page