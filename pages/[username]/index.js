import React from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import SmallHeaderPage from '../../components/SmallHeaderPage'
import PostFeed from '../../components/PostFeed'
import { postToJSON, getUserWithUsername } from '../../lib/firebase'

export async function getServerSideProps({ query }) {
  const { username } = query

  const userDoc = await getUserWithUsername(username)

  if (!userDoc) {
    return {
      notFound: true,
    }
  }

  // JSON serializable data
  let userdata = null
  let posts = null

  if (userDoc) {
    userdata = userDoc.data()

    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5)
    posts = (await postsQuery.get()).docs.map(postToJSON)
  }

  return {
    props: { userdata, posts }, // will be passed to the page component as props
  }
}
const UserProfilePage = ({ userdata, posts }) => {
  return (
    <ProtectedRoute>
      <SmallHeaderPage page={`${userdata.username}'s Posts`}>
        <div className="w-full">
            <PostFeed posts={posts} />
        </div>
      </SmallHeaderPage>
    </ProtectedRoute>
  )
}

export default UserProfilePage
