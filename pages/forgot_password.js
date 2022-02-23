import React, { useState } from 'react'
import { auth } from '../lib/firebase'
import SmallHeader from '../components/SmallHeader'
import Section from '../components/Section'
import Link from 'next/link'

const ForgotPassword = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  return (
    <>
      <SmallHeader page="Log In" />
      <Section>
        <div className="w-full pb-64 -mt-32">
          <form className="max-w-lg rounded-lg shadow-xl overflow-hidden p-6 space-y-10 mx-auto w-full">
            <div className="relative border-b-2 focus-within:border-main">
              <input
                type="text"
                name="email"
                placeholder=" "
                className="block w-full appearance-none focus:outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="emailAddress"
              />
              <label htmlFor="email" className="absolute top-0 -z-1 duration-300 origin-0">
                Forgot Email
              </label>
            </div>
            <button
              onClick={async (e) => {
                e.preventDefault()
                await auth
                  .sendPasswordResetEmail(email)
                  .then(() => {
                    setMessage('If your account exists, a link has been sent to your email.')
                  })
                  .catch((e) => console.log(e))
              }}
              disabled={email === '' || password === ''}
              className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main">
              Log In
            </button>
          </form>
          <div className="max-w-lg mx-auto mt-2 pl-4">
            <p className="ma">{message}</p>
          </div>
        </div>
      </Section>
    </>
  )
}

export default ForgotPassword
