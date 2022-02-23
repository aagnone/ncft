import React, { useState, useEffect, useContext } from 'react'
import { InboxIcon, PhoneIncomingIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../public/logo2.png'
import { firebaseLib } from '../lib/firebase'
import classnames from 'classnames'
import { SiteDataContext, UserContext } from '../context/context'
import { useInfo } from '../lib/hooks'

const Navbar = () => {
  const { user, isVerified, isAdmin, username } = useContext(UserContext)
  const [pos, setPos] = useState(false)
  const [open, setOpen] = useState(false)
  const { email, phone } = useContext(SiteDataContext)

  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      let scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 150) {
        setPos(true)
      } else {
        setPos(false)
      }
    })
  }, [])

  return (
    <>
      <nav
        style={{ zIndex: 9999 }}
        className={classnames('navbar-mobile bg-main bg-mesh h-screen absolute top-0 bottom-0 w-1/2 lg:hidden', {
          'show-nav': open
        })}>
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <Link href="/" passHref>
              <a>
                <Image src={Logo} alt="New Castle Federation of Teachers Logo" width={91} height={77} />
              </a>
            </Link>
          </div>
          <ul className="flex flex-col w-full text-white">
            <li className="mx-2">
              <Link href="/news">News</Link>
            </li>
            <li className="mx-2">
              <Link href="/documents">Documents</Link>
            </li>
            <li className="mx-2">
              <Link href="/faq">FAQ</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    href={{
                      pathname: `/${username}`
                    }}
                    passHref>
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      await firebaseLib.auth().signOut()
                      window.location.href = '/'
                    }}>
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <div className="flex justify-center">
                <li>
                  <Link href="/register" passHref>
                    <button className="text-white mr-3">Register</button>
                  </Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </div>
            )}
            {isAdmin && (
              <li>
                <Link href="/admin" passHref>
                  <button className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 rounded-2xl -mt-2 hover:from-secondary-light text-white hover:to-main">
                    Admin Console
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <nav
        className={`w-3/5 bg-transparent absolute top-0 z-50 pt-2 ${pos ? 'hidden' : 'block'}`}
        style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <div className="hidden lg:block">
          <div className="flex py-3">
            <div className="flex mr-6 align-center">
              <InboxIcon className="h-5 w-5 text-white" />
              <p className="ml-3 text-white">{email}</p>
            </div>
            <div className="flex align-center">
              <PhoneIncomingIcon className="h-5 w-5 text-white" />
              <p className="ml-3 text-white">{phone}</p>
            </div>
          </div>
          <hr className="border-0 bg-white text-gray-500 h-px my-1"></hr>
          <div className="py-2 flex justify-between items-center">
            <Link href="/" passHref>
              <a>
                <Image src={Logo} alt="New Castle Federation of Teachers Logo" width={91} height={77} />
              </a>
            </Link>
            <ul className="flex align-center text-white">
              <li className="mx-2">
                <Link href="/news">News</Link>
              </li>
              <li className="mx-2">
                <Link href="/documents">Documents</Link>
              </li>

              {/* <li className="mx-2">
                <Link href="/calendar">Calendar</Link>
              </li> */}
              <li className="mx-2">
                <Link href="/faq">FAQ</Link>
              </li>
              {user ? (
                <>
                  <li className="mx-2">
                    <Link
                      href={{
                        pathname: `/${username}`
                      }}
                      passHref>
                      <a>Profile</a>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <button
                      onClick={async () => {
                        await firebaseLib.auth().signOut()
                        window.location.href = '/'
                      }}>
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mx-2">
                    <Link href="/register" passHref>
                      <button className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main">
                        Register
                      </button>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link href="/login">Login</Link>
                  </li>
                </>
              )}
              {isAdmin && (
                <li>
                  <Link href="/admin" passHref>
                    <button className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main">
                      Admin Console
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <nav
        className={`hidden z-50 px-6 bg-white w-full shadow-xl animate-fade-in-down fixed top-0 left-0 ${
          pos ? 'md:block' : 'hidden'
        }`}>
        <div className="w-3/5 flex justify-between items-center m-auto">
          <div className="flex items-center">
            <Link href="/" passHref>
              <a>
                <Image src={Logo} alt="New Castle Federation of Teachers Logo" width={91} height={77} />
              </a>
            </Link>
          </div>
          <ul className="flex align-center text-main">
            <li className="mx-2">
              <Link href="/news">News</Link>
            </li>
            <li className="mx-2">
              <Link href="/documents">Documents</Link>
            </li>
            <li className="mx-2">
              <Link href="/calendar">Calendar</Link>
            </li>
            {/* <li className="mx-2">
              <Link href="/calendar">FAQ</Link>
            </li> */}
            {user ? (
              <>
                <li className="mx-2">
                  <Link
                    href={{
                      pathname: `/${username}`
                    }}
                    passHref>
                    <a>Profile</a>
                  </Link>
                </li>
                <li className="mx-2">
                  <button
                    onClick={async () => {
                      await firebaseLib.auth().signOut()
                      window.location.href = '/'
                    }}>
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mx-2">
                  <Link href="/register" passHref>
                    <button className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main text-white">
                      Register
                    </button>
                  </Link>
                </li>
                <li className="mx-2">
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <Link href="/admin" passHref>
                  <button className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light text-white hover:to-main">
                    Admin Console
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <nav className="lg:hidden">
        <div className="absolute z-50 right-5 top-5">
          <div onClick={() => setOpen(!open)} className={classnames({ open: open })} id="nav-icon3">
            <span className="bg-main"></span>
            <span className="bg-main"></span>
            <span className="bg-main"></span>
            <span className="bg-main"></span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
