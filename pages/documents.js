import React, { useState, useEffect } from 'react'
import Section from '../components/Section'
import SmallHeader from '../components/SmallHeader'
import { storage } from '../lib/firebase'
import ProtectedRoute from '../components/ProtectedRoute'
import Link from 'next/link'

const Documents = () => {
  const [documents, setDocuments] = useState([])
  useEffect(() => {
    storage
      .ref('uploads')
      .listAll()
      .then((res) => {
        res.items.forEach((docRef) => {
          getURL(docRef)
        })
      })
    return
  }, [])

  const getURL = (docRef) => {
    docRef.getDownloadURL().then((url) => {
      const item1 = url.split('https://firebasestorage.googleapis.com/v0/b/ncft-52970.appspot.com/o/uploads%2F')
      const name = item1[1].split('?')
      let tempArray = []
      tempArray = [...tempArray, { name: name[0], url }]
      setDocuments(tempArray)
    })
  }
  return (
    <ProtectedRoute>
      <SmallHeader page="Documents" />
      <Section>
        <div className="w-full">
            <h2 className="font-bold mb-4 text-2xl">Click links to Download (view)</h2>
          {documents?.map((doc) => (
            <Link passHref key={doc.name} href={doc.url}>
              <a className="underline mb-3">{doc.name}</a>
            </Link>
          ))}
        </div>
      </Section>
    </ProtectedRoute>
  )
}

export default Documents
