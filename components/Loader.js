import React from 'react'

const Loader = ({ show }) => {
  return show ? (
      <div className="bg-white flex space-x-2 p-5 rounded-full justify-center items-center mx-auto">
        <div className="bg-main p-2  w-4 h-4 rounded-full animate-bounce blue-circle"></div>
        <div className="bg-secondary p-2 w-4 h-4 rounded-full animate-bounce green-circle"></div>
        <div className="bg-main p-2  w-4 h-4 rounded-full animate-bounce red-circle"></div>
      </div>
  ) : null
}

export default Loader
