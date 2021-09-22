import React from 'react'
import classnames from 'classnames'

const Hxl = ({ className, color, children, bold }) => {
  return (
    <h1
      className={classnames(className, `text-5xl text-${color} my-2.5 block`, {
        'font-bold': bold,
      })}
    >
      {children}
    </h1>
  )
}

export default Hxl
