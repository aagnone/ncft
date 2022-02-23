import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../lib/firebase'
import Head from 'next/head'
import { db } from '../lib/firebase'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const router = useRouter()
  //Optional error handling
  const [error, setError] = useState(null)

  const onSubmit = (event) => {
    setError(null)
    if (passwordOne === passwordTwo)
      auth
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
          router.push('/logged_in')
        })
        .catch((error) => {
          setError(error.message)
        })
    else setError('Password do not match')
    event.preventDefault()
  }

  return (
    <div className="text-center" style={{ padding: '40px 0px' }}>
      <Head>
        <title>New Castle Federation of Teachers - Sign Up</title>
      </Head>
      <form style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={onSubmit}>
        {error && <p className="text-red-400">{error}</p>}
        <label htmlFor="signUpEmail">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="email"
          id="signUpEmail"
          placeholder="Email"
        />
        <label htmlFor="signUpPassword" sm={4}>
          Password
        </label>
        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          onChange={(event) => setPasswordOne(event.target.value)}
          id="signUpPassword"
          placeholder="Password"
        />
        <label htmlFor="signUpPassword2" sm={4}>
          Confirm Password
        </label>
        <input
          type="password"
          name="password"
          value={passwordTwo}
          onChange={(event) => setPasswordTwo(event.target.value)}
          id="signUpPassword2"
          placeholder="Password"
        />
        <label htmlFor="firstName" sm={4}>
          First name
        </label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          id="firstName"
          placeholder="First Name"
        />
        <label htmlFor="lastName" sm={4}>
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          id="lastName"
          placeholder="Last Name"
        />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
