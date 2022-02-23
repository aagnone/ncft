import React from 'react'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import '../styles/flaticon.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext, SiteDataContext } from '../context/context'
import { useInfo, useUserData } from '../lib/hooks'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()
  const siteData = useInfo()

  return (
    <UserContext.Provider value={userData}>
      <SiteDataContext.Provider value={siteData}>
        <Navbar />
        <Head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </SiteDataContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp
