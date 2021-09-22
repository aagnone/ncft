import React from 'react'
import classnames from 'classnames'

const Form = ({ children, action, wfull }) => {
  return (
    <form onSubmit={action} className={classnames('rounded-lg shadow-xl overflow-hidden p-6 space-y-10 mx-auto w-full', {'max-w-lg': !wfull})}>
      <>{children}</>
    </form>
  )
}

export default Form
