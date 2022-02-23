import React, { useState } from 'react'
import { firebaseLib, db } from '../lib/firebase'
import SmallHeader from '../components/SmallHeader'
import Section from '../components/Section'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null)

  const onSubmit = async (event) => {
    setError(null)
    event.preventDefault()
    if (passwordOne === passwordTwo)
      await firebaseLib
        .auth()
        .createUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          db.collection('users')
            .doc(authUser.user.uid)
            .set({
              isAdmin: false,
              isVerified: false,
              firstName,
              lastName,
              username: firstName + lastName
            })
          db.collection('username')
            .doc(firstName + lastName)
            .set({
              uid: authUser.user.uid
            })
          router.push('/created_account')
        })
        .catch((error) => {
          setError(error.message)
        })
    else setError('Password do not match')
  }

  return (
    <>
      <SmallHeader page="Register" />
      <Section>
        <Head>
          <title>New Castle Federation of Teachers - Register</title>
        </Head>
        <div className="w-full pb-64 -mt-32">
          <form className="max-w-lg rounded-lg shadow-xl overflow-hidden p-6 space-y-10 mx-auto w-full">
            <div className="relative border-b-2 focus-within:border-main">
              <input
                type="text"
                name="fName"
                placeholder=" "
                className="block w-full appearance-none focus:outline-none bg-transparent"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
              />
              <label htmlFor="fName" className="absolute top-0 -z-1 duration-300 origin-0">
                First Name
              </label>
            </div>
            <div className="relative border-b-2 focus-within:border-main">
              <input
                type="text"
                name="lName"
                placeholder=" "
                className="block w-full appearance-none focus:outline-none bg-transparent"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
              />
              <label htmlFor="email" className="absolute top-0 -z-1 duration-300 origin-0">
                Last Name
              </label>
            </div>
            <div className="relative border-b-2 focus-within:border-main">
              <input
                type="email"
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
                value={passwordOne}
                onChange={(e) => setPasswordOne(e.target.value)}
                id="password"
              />
              <label htmlFor="password" className="absolute top-0 -z-1 duration-300 origin-0">
                Password
              </label>
            </div>
            <div className="relative border-b-2 focus-within:border-main">
              <input
                type="password"
                name="passwordTwo"
                placeholder=" "
                className="block w-full appearance-none focus:outline-none bg-transparent"
                value={passwordTwo}
                onChange={(e) => setPasswordTwo(e.target.value)}
                id="passwordTwo"
              />
              <label htmlFor="passwordTwo" className="absolute top-0 -z-1 duration-300 origin-0">
                Verify Password
              </label>
            </div>
            <button
              onClick={(e) => onSubmit(e)}
              className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main">
              Create an Account
            </button>
          </form>
          <div className="max-w-lg mx-auto mt-2 pl-4">
            <p className="ma">{error}</p>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Register
