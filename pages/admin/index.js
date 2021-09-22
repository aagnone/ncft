import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import kebabCase from 'lodash.kebabcase'
import ProtectedRoute from '../../components/ProtectedRoute'
import SmallHeader from '../../components/SmallHeader'
import Section from '../../components/Section'
import PostFeed from '../../components/PostFeed'
import { toast } from 'react-toastify'
import { db, serverTimestamp, auth } from '../../lib/firebase'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../context/context'
import Link from 'next/link'
import AdminNav from '../../components/AdminNav'

const index = () => {
  return (
    <ProtectedRoute>
      <SmallHeader page="Admin" />
      <Section>
        <div className="w-full">
            <AdminNav />
            <div className="my-12 w-full flex justify-between items-center flex-col md:flex-row">
              <h2 className="text-3xl text-center flex-1">Create new Post</h2>
              <CreateNewPost />
            </div>
          <PostList />
        </div>
      </Section>
    </ProtectedRoute>
  )
}

function PostList() {
  const ref = db.collection('users').doc(auth.currentUser.uid).collection('posts')
  const query = ref.orderBy('createdAt')
  const [querySnapshot] = useCollection(query)

  const posts = querySnapshot?.docs.map((doc) => doc.data())

  return (
    <>
      <h1 className="text-3xl my-8 text-center">Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  )
}

const CreateNewPost = () => {
  const router = useRouter()
  const { user, username } = useContext(UserContext)
  const [title, setTitle] = useState('')

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title))

  // Validate length
  const isValid = title.length > 3 && title.length < 100

  const createPost = async (e) => {
    e.preventDefault()
    const ref = db.collection('users').doc(user?.uid).collection('posts').doc(slug)

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid: user?.uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    }

    await ref.set(data)

    toast('Post created!')

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`)
  }

  return (
    <form
      onSubmit={createPost}
      className="mt-4 max-w-lg rounded-lg shadow-xl overflow-hidden p-6 space-y-10 w-full"
    >
      <div className="relative border-b-2 focus-within:border-main">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full appearance-none focus:outline-none bg-transparent"
          name="title"
          id="title"
        />
        <label htmlFor="title" className="absolute top-0 -z-1 duration-300 origin-0">
          Post Title
        </label>
      </div>
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button
        disabled={!isValid}
        className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main"
      >
        Create Post
      </button>
    </form>
  )
}

export default index
