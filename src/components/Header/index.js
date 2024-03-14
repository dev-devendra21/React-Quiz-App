import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  const handleLogOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  if (history.location.pathname === '/') {
    localStorage.clear()
  }

  return (
    <>
      <header className="header">
        <div>
          <Link to="/">
            <img
              src="https://res.cloudinary.com/ddox0bhgm/image/upload/v1708774725/NxtAssess/header_logo_moshfs.png"
              className="website-header-logo"
              alt="website logo"
            />
          </Link>
        </div>
        <div>
          <button
            type="button"
            onClick={handleLogOut}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  )
}

export default withRouter(Header)
