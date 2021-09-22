import React from 'react'

const Form = ({ children }) => {
  return (
    <form className="max-w-lg rounded-lg shadow-xl overflow-hidden p-6 space-y-10 mx-auto w-full">
      <>{children}</>
    </form>
  )
}

export default Form
