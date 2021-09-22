import React, { useState } from 'react'
import { db } from '../../lib/firebase'
import SmallHeader from '../../components/SmallHeader'
import Section from '../../components/Section'
import AdminNav from '../../components/AdminNav'
import { useInfo } from '../../lib/hooks'
import classnames from 'classnames'
import Form from '../../components/Form'
import FloatingInput from '../../components/FloatingInput'

const SiteInfo = () => {
  const info = useInfo()
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState(info.phone)
  return (
    <>
      <SmallHeader page="Update Info" />
      <Section>
        <div className="w-full">
          <AdminNav />
          <div className="w-full">
          {info.phone}
            <button onClick={() => setOpen(!open)} className="w-full bg-main text-white text-center p-2 rounded-md">
              preview
            </button>
            {Object.entries(info).map(([key, val]) => (
              <div
                className={classnames('w-full justify-between mb-2 border-b-2 border-black py-3', {
                  flex: open,
                  hidden: !open,
                })}
                key={key}
              >
                <h2 className="font-bold">{key}: </h2>
                <p className="w-1/2">{val}</p>
              </div>
            ))}
            <Form>
              <FloatingInput
                type='text'
                name='phone'
                placeholder=" "
                className="block w-full appearance-none focus:outline-none bg-transparent"
                value={phone}
                onchange={(e) => setPhone(e.target.value)}
              />
            </Form>
          </div>
        </div>
      </Section>
    </>
  )
}

export default SiteInfo
