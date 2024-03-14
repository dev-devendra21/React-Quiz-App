import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import './index.css'

const LoaderRoute = () => (
  <>
    <Header />
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  </>
)

export default LoaderRoute
