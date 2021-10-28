import React from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Truncate from 'react-truncate'
import { Fade } from 'react-reveal'

const Card = ({ post, isShifted }) => {
  return (
    <Fade>
      <Link href={`/${post.username}/${post.slug}`}>
        <a>
          <div
            className={classnames(
              'cursor-pointer lg:mb-0 mb-8 max-w-1/3 relative z-10 hover:bg-main md:text-main p-4 hover:text-white rounded-2xl small-dropshadow transition-all duration-100 card-style transform',
              {
                'lg:-translate-y-10': isShifted,
              }
            )}
          >
            <div className="icon-style bg-accent-light transition-all duration-100">
              <i className="flaticon-college transition-all duration-100" />
            </div>
            <h1 className="text-2xl my-3 font-bold transition-all duration-100">{post?.title}</h1>
            <Truncate lines={1}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </Truncate>
          </div>
        </a>
      </Link>
    </Fade>
  )
}

export default Card
