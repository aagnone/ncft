import React from 'react'
import Card from './Card'
import PostItem from './PostItem'

const PostFeed = ({ posts, admin }) => {
  return (
    <div className="w-full md:grid md:grid-cols-2 gap-8">
      {posts ? posts.map((post,index) => <PostItem itemIndex={index} post={post} key={post.slug} admin={admin} />) : null}
    </div>
  )
}

export default PostFeed
