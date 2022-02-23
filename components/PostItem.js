import React, { useContext } from 'react'
import Link from 'next/link'
import { UserIcon, ClockIcon, HeartIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Truncate from 'react-truncate'
import { UserContext } from '../context/context'
const PostItem = ({ post, itemIndex, admin = false }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length
  const minutesToRead = (wordCount / 100 + 1).toFixed(0)
  const { user, isAdmin } = useContext(UserContext)

  return (
    <div className="relative">
      <Link href={`/${post.username}/${post.slug}`}>
        <a>
          <div className="w-full main-shadow rounded-md p-0 overflow-hidden mb-8 md:mb-0">
            <div className="w-full p-6">
              <div className="flex pb-4 flex-wrap">
                <div className="flex-1 flex text-main">
                  <div className="flex justify-center mr-4">
                    <ClockIcon className="text-main h-6 w-6 mr-2" />{' '}
                    <p>
                      {minutesToRead}min read time ({wordCount} words)
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <UserIcon className="text-main h-6 w-6 mr-2" />
                    <p>{post?.username}</p>
                  </div>
                </div>
                <div className="flex">
                  <HeartIcon className="text-red-600 h-6 w-6 mr-2 transform hover:scale-150 transition-all" />{' '}
                  {post?.heartCount}
                </div>
              </div>
              <hr className="border-0 bg-main text-gray-500 h-px my-3 opacity-20"></hr>
              <h1 className="text-2xl font-bold mt-4 mb-2">{post?.title}</h1>
              <Truncate lines={1}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </Truncate>
            </div>
            <div className="relative top-2 overflow-hidden">
              <Image
                src={`https://picsum.photos/570/330?random=${itemIndex}`}
                alt="New Castle Federation of Teachers Logo"
                width={570}
                height={330}
                className="transform transition-all hover:scale-110 duration-500"
              />
            </div>
          </div>
        </a>
      </Link>
      {user && isAdmin && (
        <>
          <Link passHref href={`/admin/${post.slug}`}>
            <button className="bg-main text-blue-300 px-2 py-1 rounded-md absolute bottom-5 left-5">Edit Post</button>
          </Link>
          <button className="bg-main text-blue-300 px-2 py-1 rounded-md absolute bottom-5 right-5">Delete Post</button>
        </>
      )}
    </div>
  )
}

export default PostItem
