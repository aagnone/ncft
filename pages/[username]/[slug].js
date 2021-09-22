import React, {useContext} from 'react'
import Image from 'next/image'
import SmallHeader from '../../components/SmallHeader'
import Section from '../../components/Section'
import { db, getUserWithUsername, postToJSON } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { UserIcon, HeartIcon } from '@heroicons/react/solid'
import ReactMarkdown from 'react-markdown'
import '../../styles/Markdown.module.scss'
import Link from 'next/link'
import { UserContext } from '../../context/context'

export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug)
    post = postToJSON(await postRef.get())

    path = postRef.path
  }

  return {
    props: { post, path },
    revalidate: 5000,
  }
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await db.collectionGroup('posts').get()

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  }
}

const PostPage = (props) => {
  const postRef = db.doc(props.path)
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post
  const createdAt = typeof post?.createdAt === 'number' ? new Date(props.post.createdAt) : post.createdAt.toDate()
  const newdate = createdAt.toDateString()
  const {isAdmin} = useContext(UserContext)

  return (
    <>
      <SmallHeader page={props.post.title} />
      <Section>
        <div className="w-full">
          <div className="w-full relative">
            <div className={'image-container rounded-xl overflow-hidden mb-2'}>
              <Image alt="business person" src={'https://picsum.photos/750/350'} layout="fill" className={'image'} />
            </div>
            <div
              className="bg-main text-white absolute top-3 left-3 rounded-lg py-4 px-4"
              style={{ writingMode: 'tb-rl' }}
            >
              <p>{newdate}</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-1 items-center">
              <UserIcon className="text-main h-6 w-6 mr-2" />
              <p className="mr-2">{post?.username}</p>
              {isAdmin && <Link href={`/admin/${props.post.slug}`} passHref>
                <button className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 p-2 px-4 rounded-2xl hover:from-secondary-light hover:to-main mt-2 text-white">
                  Edit Post
                </button>
              </Link>}
            </div>
            <div className="flex">
              <HeartIcon className="text-red-600 h-6 w-6 mr-2 transform hover:scale-150 transition-all" />{' '}
              {post?.heartCount}
            </div>
          </div>
          <div className="w-full prose lg:prose-xl max-w-full mt-4">
            <ReactMarkdown>{post?.content}</ReactMarkdown>
          </div>
        </div>
      </Section>
    </>
  )
}

export default PostPage
