import React from 'react'

const TextMarker = ({ children }) => {
  return (
    <p className="uppercase tracking-widest bg-accent-light text-dark font-large inline-block w-max py-3 px-6 rounded-lg my-3">
      {children}
    </p>
  )
}

export default TextMarker
