import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import '../styles/flaticon.css'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../context/auth'
import Footer from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../context/context'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
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
    </UserContext.Provider>
  )
}

export default MyApp
