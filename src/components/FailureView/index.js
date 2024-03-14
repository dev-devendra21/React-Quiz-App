import Header from '../Header'
import './index.css'

const FailureView = ({onRetry}) => (
  <>
    <Header />
    <div className="failure-view-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/ddox0bhgm/image/upload/v1707470619/NxtAssess/failure_img.jpg"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-paragraph">We are having some trouble</p>
      <button type="button" onClick={onRetry} className="retry-btn">
        Retry
      </button>
    </div>
  </>
)

export default FailureView
