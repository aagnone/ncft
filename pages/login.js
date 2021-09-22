import React, { useState } from 'react'
import { firebaseLib } from '../lib/firebase'
import 'firebase/auth'
import SmallHeader from '../components/SmallHeader'
import Section from '../components/Section'
import Link from 'next/link'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
                Email
              </label>
            </div>
            <div className="relative border-b-2 focus-within:border-main">
              <input
                type="password"
                name="password"
                placeholder=" "
                className="block w-full appearance-none focus:outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
              <label htmlFor="password" className="absolute top-0 -z-1 duration-300 origin-0">
                Password
              </label>
            </div>
            <button
              onClick={async (e) => {
                e.preventDefault()
                await firebaseLib
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {
                    window.location.href = '/'
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }}
              disabled={email === '' || password === ''}
              className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main"
            >
              Log In
            </button>
          </form>
          <div className="max-w-lg mx-auto mt-2 pl-4">
            <p className="ma">
              No Account?{' '}
              <Link href="/register" passHref>
                <a className="text-main underline">Sign Up!</a>
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Login
