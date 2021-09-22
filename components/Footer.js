import React, {useContext} from 'react'
import Image from 'next/image'
import Logo from '../public/logo2.png'
import classnames from 'classnames'
import { UserContext } from '../context/context'
import { useInfo } from '../lib/hooks'
const Footer = () => {
  const { user } = useContext(UserContext)
  const {email, phone, address} = useInfo()
  return (
    <div className={classnames("footer w-full block relative bg-main text-white", {"pt-64": user})}>
      {user ? null : (
        <div className="w-full text-black mb-12">
          <div className="new-shadow z-40 relative rounded-lg bg-no-repeat bg-white p-24 w-3/5 m-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold w-1/2">Register an account and be a part of the family.</h1>
            <button className="font-bold bg-gradient-to-r from-main to-secondary-main border-0 p-5 text-black text-lg px-12 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      ) }

      <div className="flex lg:w-3/5 w-full m-auto justify-between pb-12">
        <div>
          <Image src={Logo} alt="New Castle Federation of Teachers Logo" width={91} height={77} />
          <ul>
            <li>{phone}</li>
            <li>{email}</li>
            <li>{address}</li>
          </ul>
        </div>
        <div>
          <h1 className="text-4xl mb-6">Links</h1>
          <ul>
            <li>News</li>
            <li>Documents</li>
            <li>Contact</li>
            <li>Calendar</li>
            <li>Faq</li>
            <li>Survey</li>
          </ul>
        </div>
        <div>
          <h1 className="text-4xl mb-6">Outside Links</h1>
          <ul>
            <li>AFT</li>
            <li>Para & Secretaries</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
