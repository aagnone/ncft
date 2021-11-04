import React, { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import { firebaseLib, db } from '../lib/firebase'
import 'firebase/compat/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isVerified, setIsVerified] = useState(null)
  const [isAdmin, setIsAdmin] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    return firebaseLib.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        setIsVerified(null)
        setIsAdmin(null)
        setUsername(null)
        nookies.set(undefined, 'token', '', {})
        return
      }
      const token = await user.getIdToken()
      setUser(user)
      nookies.set(undefined, 'token', token, {})
    })
  }, [])

  useEffect(() => {
    if (user) {
      const docRef = db.collection('users').doc(user?.uid)

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIsVerified(doc.data().isVerified)
            setIsAdmin(doc.data().isAdmin)
            setUsername(doc.data().username)
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    }
  }, [user])

  return <AuthContext.Provider value={{ user, isVerified, isAdmin, username }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
