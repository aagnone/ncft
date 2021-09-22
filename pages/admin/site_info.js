import React, { useState, useContext } from 'react'
import { db } from '../../lib/firebase'
import SmallHeader from '../../components/SmallHeader'
import Section from '../../components/Section'
import AdminNav from '../../components/AdminNav'
import Form from '../../components/Form'
import FloatingInput from '../../components/FloatingInput'
import { toast } from 'react-toastify'
import { SiteDataContext } from '../../context/context'
import ProtectedRoute from '../../components/ProtectedRoute'

const SiteInfo = () =>  {
  const data = useContext(SiteDataContext)
  const [phone, setPhone] = useState(data.phone)
  const [email, setEmail] = useState(data.email)
  const [address, setAddress] = useState(data.address)
  const [mission, setMission] = useState(data.mission)
  const [lead, setLead] = useState(data.lead)

  const handleSubmit = (e) => {
    e.preventDefault()
    const infoRef = db.collection('siteData').doc('info')

    infoRef
      .set({ phone, email, address, mission, lead })
      .then(() => {
        toast('Document successfully written')
      })
      .catch((error) => {
        toast(`error writing document ${error}`)
      })

    return
  }
  return (
    <ProtectedRoute>
      <SmallHeader page="Update Info" />
      <Section>
        <div className="w-full">
          <AdminNav />
          <div className="w-full">
            <h2 className="text-2xl my-8">Update information</h2>
            {data && (
              <Form wfull action={(e) => handleSubmit(e)}>
                <FloatingInput
                  type="text"
                  name="phone"
                  value={phone}
                  onchange={(e) => setPhone(e.target.value)}
                />
                <FloatingInput
                  type="text"
                  name="email"
                  value={email}
                  onchange={(e) => setEmail(e.target.value)}
                />
                <FloatingInput
                  type="text"
                  name="address"
                  value={address}
                  onchange={(e) => setAddress(e.target.value)}
                />
                <FloatingInput
                  type="text"
                  name="mission"
                  value={mission}
                  onchange={(e) => setMission(e.target.value)}
                />
                <FloatingInput
                  type="text"
                  name="lead"
                  value={lead}
                  onchange={(e) => setLead(e.target.value)}
                />
                <button className="w-full bg-main bg-gradient-to-r text-white from-main to-secondary-light border-0 p-2 px-4 rounded-2xl mt-2 hover:from-secondary-light hover:to-main">
                  Submit
                </button>
              </Form>
            )}
          </div>
        </div>
      </Section>
    </ProtectedRoute>
  )
}

export default SiteInfo
