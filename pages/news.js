import React, { useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Section from '../components/Section'
import SmallHeader from '../components/SmallHeader'
import PostFeed from '../components/PostFeed'
import Loader from '../components/Loader'
import { db, postToJSON, fromMillis } from '../lib/firebase'

const LIMIT = 4

export async function getServerSideProps(context) {
  const postsQuery = db
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJSON)

  return {
    props: { posts }, // will be passed to the page component as props
  }
}

const News = (props) => {
  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)
    const last = posts[posts.length - 1]
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt

    const query = db
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)

    const newPosts = (await query.get()).docs.map((doc) => doc.data())

    setPosts(posts.concat(newPosts))
    setLoading(false)

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  }

  return (
    <ProtectedRoute>
      <SmallHeader page="News" />
      <Section>
        <div className="w-full p-4 md:p-0">
          {posts ? (
            <>
              <PostFeed posts={posts} />
              {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}
              <Loader show={loading} />
              {postsEnd && 'You have reached the end!'}
            </>
          ) : (
            <h1>No News yet. Come back soon for more!</h1>
          )}
        </div>
      </Section>
    </ProtectedRoute>
  )
}

export default News
