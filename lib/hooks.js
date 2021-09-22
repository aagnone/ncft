import { auth, db } from './firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)
  const [isVerified, setIsVerified] = useState(null)
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe

    if (user) {
      const ref = db.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username)
        setIsVerified(doc.data()?.isVerified)
        setIsAdmin(doc.data()?.isAdmin)
      })
    } else {
      setUsername(null)
    }

    return unsubscribe
  }, [user, isVerified, isAdmin, username])

  return { user, username, isVerified, isAdmin }
}

export function useModal() {
  const [open, onOpenModal] = useState(false)
  const [close, onCloseModal] = useState(false)
  const openModal = () => {
    onOpenModal(true)
  }
  const closeModal = () => {
    onCloseModal(true)
    onOpenModal(false)
  }
  return { open, close, openModal, closeModal }
}

export function useInfo() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let unsubscribe

    const ref = db.collection('siteData').doc('info')
    unsubscribe = ref.onSnapshot((doc) => {
      setData(doc.data())
    })

    return unsubscribe
  }, [data])

  return { ...data }
}

export function useFaq() {
  const [data, setData] = useState([])

  useEffect(() => {
    let unsubscribe;
      const ref = db.collection('faq')
      unsubscribe = ref.get().then((querySnapshot) => {
        let tempData = []
        querySnapshot.forEach((doc) => {
            tempData = [...tempData, doc.data()]
            setData(tempData)
        });
    });

    return unsubscribe
  }, [])

  return data
}