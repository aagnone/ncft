import React, { useState } from 'react'
import classnames from 'classnames'
const FaqItem = ({ data }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-5/12">
      <button className="w-full main-shadow text-main rounded-lg overflow-hidden" onClick={() => setOpen(!open)}>
        <p className={classnames('w-full transition-all p-4', { 'bg-blue-200': open})}>{data.title}</p>
      </button>
      <p
        className={classnames('mx-auto rounded-lg w-full transition-all p-4 text-left main-shadow -mt-2', {
          block: open,
          hidden: !open,
          'opacity-100': open,
          'opacity-0': !open,
        })}

        style={{width: '98%'}}
      >
        {data.content}
      </p>
    </div>
  )
}

export default FaqItem
