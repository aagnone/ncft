import React, { useState, useContext } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useRouter } from 'next/router'
import { db, serverTimestamp } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { toast } from 'react-toastify'
import SmallHeader from '../../components/SmallHeader'
import Section from '../../components/Section'
import styles from '../../styles/Admin.module.scss'
import { UserContext } from '../../context/context'
import ImageUploader from '../../components/ImageUploader'
const AdminPostEdit = () => {
  return (
    <ProtectedRoute>
      <SmallHeader />
      <Section>
        <PostManager />
      </Section>
    </ProtectedRoute>
  )
}

function PostManager() {
  const {user} = useContext(UserContext)
  const [preview, setPreview] = useState(false)

  const router = useRouter()
  const { slug } = router.query

  const postRef = db.collection('users').doc(user?.uid).collection('posts').doc(slug)
  const [post] = useDocumentData(postRef)

  return (
    <div className="w-full">
      {post && (
        <>
          <section className="w-full">
            <h1>{post.title}</h1>
            <p className="mb-4">ID: {post.slug}</p>
            <a className="bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl mb-3 hover:from-secondary-light hover:to-main" href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer">Link to Markdown Tutorial</a>
            <PostForm postRef={postRef} defaultValues={post} preview={preview} />
          </section>

          <aside>
            <h3>Tools</h3>
            <ImageUploader />
            <button className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl mt-2 hover:from-secondary-light hover:to-main" onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`} passHref>
              <button className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl mt-2 hover:from-secondary-light hover:to-main">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </div>
  )
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: 'onChange' })

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    })

    reset({ content, published })

    toast('Post updated successfully!')
  }

  return (
    <form
      className="rounded-lg shadow-xl overflow-hidden p-6 space-y-10 mx-auto w-full"
      onSubmit={handleSubmit(updatePost)}
    >
      {preview && (
        <div className="card prose lg:prose-xl max-w-full p-4">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={`w-full ${preview ? styles.hidden : styles.controls}`}>
        <div className="relative border-b-2 focus-within:border-main">
          <textarea
            className="block w-full appearance-none focus:outline-none bg-transparent"
            name="content"
            {...register('content')}
          ></textarea>
          <label htmlFor="content" className="absolute top-0 -z-1 duration-300 origin-0">
            Content
          </label>
        </div>

        <fieldset>
          <input className="mr-2" name="published" type="checkbox" {...register('published')} />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl mt-2 hover:from-secondary-light hover:to-main">
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default AdminPostEdit
