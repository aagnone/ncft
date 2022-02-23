import React, { useState } from 'react'
import { toast } from 'react-toastify'
import FloatingInput from '../../components/FloatingInput'
import Form from '../../components/Form'
import ProtectedRoute from '../../components/ProtectedRoute'
import SmallHeader from '../../components/SmallHeader'
import Section from '../../components/Section'
import { db } from '../../lib/firebase'

const Faq = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    db.collection('faq')
      .doc(title)
      .set({
        title,
        content
      })
      .then(() => {
        toast('Submitted Faq')
        setTitle('')
        setContent('')
      })
      .catch((error) => toast(`Error: ${error}`))
  }

  return (
    <ProtectedRoute>
      <SmallHeader page="Add FAQ" />
      <Section>
        <div className="w-full">
          <Form wfull action={(e) => handleSubmit(e)}>
            <FloatingInput type="text" name="title" value={title} onchange={(e) => setTitle(e.target.value)} />
            <FloatingInput type="text" name="content" value={content} onchange={(e) => setContent(e.target.value)} />
            <button className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl mt-2 hover:from-secondary-light hover:to-main">
              Submit
            </button>
          </Form>
        </div>
      </Section>
    </ProtectedRoute>
  )
}

export default Faq
