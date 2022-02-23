import React, { useState, useEffect } from 'react'
import Section from '../components/Section'
import SmallHeader from '../components/SmallHeader'
import { storage } from '../lib/firebase'
import ProtectedRoute from '../components/ProtectedRoute'
import Link from 'next/link'
import Head from 'next/head'

const Documents = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    storage.ref().child('uploads/').listAll()
      .then(res => {
        res.items.forEach((item) => {
          setData(arr => [...arr, item.name]);
        })
      })
      .catch(err => {
        alert(err.message);
      })
    return
  }, [])

  return (
    <ProtectedRoute>
      <Head>
        <title>New Castle Federation of Teachers - Documents</title>
      </Head>
      <SmallHeader page="Documents" />
      <Section>
        <div className="w-full">
            <h2 className="font-bold mb-4 text-2xl">Click links to Download (view)</h2>
          {data?.map((doc) => (
            <p>
              <Link style={{display: 'block'}} passHref key={doc} href={'https://firebasestorage.googleapis.com/v0/b/ncft-52970.appspot.com/o/uploads%2F'+doc+'?alt=media&token=def42aa6-7bbf-4293-a119-ed7a80e12672'}>
                <a target="_blank" className="underline mb-3">{doc}</a>
              </Link>
            </p>
          ))}
        </div>
      </Section>
    </ProtectedRoute>
  )
}

export default Documents
