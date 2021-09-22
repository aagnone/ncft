import React from 'react'
import Card from './Card'
import TextCard from './TextCard'
import db, { postToJSON } from '../lib/firebase'

const BlogPreview = ({ posts }) => {
  return (
    <div className="relative">
      <div className="lg:grid grid-cols-3 gap-4 mx-2">
        <TextCard />
        {posts?.map((post, i) => {
          return (<Card key={post.slug} post={post} isShifted={i === 2} />)
        })}
      </div>
    </div>
  )
}

export default BlogPreview
