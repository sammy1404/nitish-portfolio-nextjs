import React from 'react'
import "./blogheader.css"
import "../../app/globals.css"
import BlogHeader from "./BlogHeader"
import BlogContent from "./BlogContent"
import ThemeButton from '../components/themeButton'


const Page = () => {
  return (
    <>
    <ThemeButton />
    <BlogHeader />
    <BlogContent />
    </>
  )
}

export default Page