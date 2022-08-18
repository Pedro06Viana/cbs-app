import { AppProvider } from '../data/context/AppContext'
import "react-toastify/dist/ReactToastify.css";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

export default MyApp
