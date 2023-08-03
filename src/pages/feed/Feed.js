import React from 'react'
import Post from '../../components/posts/Post'
import './feed.css'
import Search from '../../components/search/Search'

function Feed() {
  
  return (
    <div className='feed'>
    <div><Search/></div>
    <div><Post/></div>
    </div>
  )
}

export default Feed