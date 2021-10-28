import React, {useContext} from 'react'
import Image from 'next/image'
import Logo from '../public/logo2.png'
import classnames from 'classnames'
import { UserContext } from '../context/context'
import { useInfo } from '../lib/hooks'
import Link from 'next/link'
const Footer = () => {
  const { user } = useContext(UserContext)
  const {email, phone, address} = useInfo()
  return (
    <div className={classnames("footer w-full block relative bg-main text-white", {"pt-64": user})}>
      {user ? null : (
        <div className="hidden md:block w-full text-black mb-12">
          <div className="new-shadow z-40 relative rounded-lg bg-no-repeat bg-white p-24 w-3/5 m-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold w-1/2">Register an account and be a part of the family.</h1>
            <button className="font-bold bg-gradient-to-r from-dark to-main border-0 p-5 text-white text-lg px-12 rounded-2xl">
              Register
            </button>
          </div>
        </div>
      ) }

      <div className="flex md:pt-0 pt-24 lg:w-3/5 w-full m-auto justify-between pb-12">
        <div className="px-4 md:px-0">
          <Image src={Logo} alt="New Castle Federation of Teachers Logo" width={91} height={77} />
          <ul>
            <li>{phone}</li>
            <li>{email}</li>
            <li>{address}</li>
          </ul>
        </div>
        <div className="px-4 md:px-0">
          <h1 className="text-4xl mb-6">Links</h1>
          <ul>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/documents">Documents</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/calendar">Calendar</Link></li>
            <li><Link href="/faq">Faq</Link></li>
          </ul>
        </div>
        <div className="px-4 md:px-0">
          <h1 className="text-4xl mb-6">Outside Links</h1>
          <ul>
            <li><a href="https://www.aft.org/" target="_blank" rel="noreferrer">AFT</a></li>
            <li><a href="https://www.aft.org/psrp" target="_blank" rel="noreferrer">Para & Secretaries</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
