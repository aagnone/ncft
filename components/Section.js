import React from 'react'

const Section = ({ children, fullWidth }) => {
  return (
    <div className="light-bg bg-no-repeat bg-left-top bg-opacity-30 mb-48">
      <div className={`flex ${fullWidth ? 'lg:w-screen' : ''} lg:w-3/5 w-4/5 relative pt-12 mx-auto items-center`}>
        {children}
      </div>
    </div>
  )
}

export default Section
