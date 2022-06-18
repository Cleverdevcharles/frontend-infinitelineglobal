import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BACKEND_API } from '../../../config'
import { isAuthenticated, signout } from '../../../functions/auth'
import { getSites, list } from '../../apiCore'
import Site from '../../card/Site'

function Header() {
  const [show, setShow] = useState(false)
  const [menu, setMenu] = useState(false)
  const [showlogout, setShowLogout] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCloseLogout = () => setShowLogout(false)
  const handleShowLogout = () => setShowLogout(true)
  const [sitesByArrival, setSitesByArrival] = useState([])
  const [sites, setSites] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [
    isScrollValueMoreThanHeaderHeight,
    setIsScrollValueMoreThanHeaderHeight,
  ] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollValueMoreThanHeaderHeight(window.scrollY > 96)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const history = useHistory()

  const { user } = isAuthenticated()
  const toggleMenu = () => {
    setMenu(menu ? false : true)
  }

  const loadSitesByArrival = () => {
    getSites('createdAt').then((data) => {
      if (data && data.error) {
        setError(data.error)
      } else {
        setSitesByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadSitesByArrival()
  }, [])

  const loadSites = () => {
    getSites().then((data) => {
      if (data && data.error) {
        setLoading(false)
      } else {
        setLoading(false)
        setSites(data)
      }
    })
  }

  useEffect(() => {
    loadSites()
  }, [])

  const dashboard = () => {
    if (user.role === 'Admin') {
      history.push('/admin-dashboard')
      window.location.reload()
    } else {
      history.push('/dashboard')
      window.location.reload()
    }
  }
  return (
    <>
      {sites &&
        sites.length > 0 &&
        sites.map((s, i) => (
          <header className="header-one">
            {/* Start top bar  */}
            <div className="topbar-area">
              <div className="container">
                <div className="row">
                  <div className=" col-md-8 col-sm-8 col-xs-6">
                    <div className="topbar-left">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fas fa-envelope">
                              &nbsp;
                              <span style={{ color: '#fff' }}>{s.email}</span>
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-6">
                    <div className="topbar-right">
                      <ul>
                        {user ? (
                          <li>
                            <br />
                            <span
                              className="text-white"
                              style={{ color: '#fff' }}
                            >
                              {user.fullName}
                            </span>
                          </li>
                        ) : (
                          <li>
                            <br />
                            <Link
                              to="/login"
                              className="text-white"
                              style={{ color: '#fff' }}
                            >
                              <img src="img/icon/login.png" alt="" />
                              Login
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End top bar  */}

            {/* header-area start  */}
            <div
              id="sticker "
              className={
                isScrollValueMoreThanHeaderHeight
                  ? 'header-menu-area header-area stick'
                  : 'header-menu-area header-area '
              }
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="row">
                      {/* logo start */}
                      <div
                        className="col-md-3 col-sm-3"
                        style={
                          isScrollValueMoreThanHeaderHeight
                            ? {
                                cursor: 'pointer',
                                maxWidth: '150px',
                                height: "50px",
                              }
                            : {
                                cursor: 'pointer',
                                maxWidth: '150px',
                                height: "50px",
                              }
                        }
                      >
                        <div className="logo">
                          {/* Brand */}
                          <Link className="navbar-brand page-scroll" to="/">
                            <img
                              src={`${BACKEND_API}/site/logo/${s._id}`}
                              alt={s.name}
                              style={
                                isScrollValueMoreThanHeaderHeight
                                  ? {
                                      cursor: 'pointer',
                                      maxWidth: '150px',
                                    }
                                  : {
                                      cursor: 'pointer',
                                      maxWidth: '150px',
                                    }}
                            />
                          </Link>
                        </div>
                        {/* logo end  */}
                      </div>
                      <div className="col-md-9 col-sm-9">
                        <div className="header-right-link">
                          {/* search option end  */}
                          {user ? (
                            <a
                              onClick={() => {
                                signout(() => {
                                  toast.success('Signout Successfully')
                                  history.push('/')
                                })
                              }}
                              className="s-menu logout text-white"
                              style={
                                isScrollValueMoreThanHeaderHeight
                                  ? { cursor: 'pointer', marginTop: '10px' }
                                  : { cursor: 'pointer' }
                              }
                            >
                              Logout
                            </a>
                          ) : (
                            <Link
                              to="/register"
                              className="s-menu register text-white"
                              style={
                                isScrollValueMoreThanHeaderHeight
                                  ? { cursor: 'pointer', marginTop: '10px' }
                                  : { cursor: 'pointer' }
                              }
                            >
                              Signup
                            </Link>
                          )}
                        </div>
                        {/*  mainmenu start */}
                        <nav className="navbar navbar-default">
                          <div
                            className="collapse navbar-collapse"
                            id="navbar-example"
                          >
                            <div className="main-menu">
                              <ul
                                className="nav navbar-nav navbar-right"
                                style={
                                  isScrollValueMoreThanHeaderHeight
                                    ? { cursor: 'pointer' }
                                    : { cursor: 'pointer' }
                                }
                              >
                                <li>
                                  <Link to="/">Home</Link>
                                </li>
                                {user ? (
                                  <li>
                                    <Link to="#" onClick={dashboard}>
                                      Dashboard
                                    </Link>
                                  </li>
                                ) : null}
                                <li>
                                  <Link to="/investment">Invest</Link>
                                </li>
                                <li>
                                  <Link to="/about">About us</Link>
                                </li>
                                <li>
                                  <Link to="/contact">Contact Us</Link>
                                </li>
                                <li>
                                  <Link to="/reviews">Reviews</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </nav>
                        {/* mainmenu end  */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* header-area end  */}

            {/* mobile-menu-area start */}
            <div
              className="col-md-12"
              style={{ position: 'fixed', width: '100%' }}
            >
              <a
                onClick={toggleMenu}
                className="hd-btn bars text-white page-scroll"
                style={
                  isScrollValueMoreThanHeaderHeight
                    ? {
                        cursor: 'pointer',
                        color: '#e6922e',
                        marginTop: '50px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        backgroundColor: '#e6922e',
                        color:"#fff",
                        zIndex: '999',
                        borderRadius: '50%',
                      }
                    : {
                        cursor: 'pointer',
                        color: '#e6922e',
                        marginTop: '-50px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                      }
                }
              >
                {menu ? (
                  <i className="fas fa-times times"></i>
                ) : (
                  <i className="fas fa-bars"></i>
                )}
              </a>
              <div
                className="mobile-menu"
                style={menu ? { display: 'block' } : { display: 'none' }}
              >
                <ul
                  className="main-menu"
                  style={
                    isScrollValueMoreThanHeaderHeight
                      ? { marginTop: '65px' }
                      : { marginTop: '20px' }
                  }
                >
                  <div className="line"></div>
                  <li onClick={toggleMenu}>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <div className="line"></div>
                  {user ? (
                    <li onClick={toggleMenu}>
                      <Link to="#" className="nav-link" onClick={dashboard}>
                        Dashboard
                      </Link>
                    </li>
                  ) : null}
                  <div className="line"></div>
                  <li onClick={toggleMenu}>
                    <Link to="/investment" className="nav-link">
                      Invest
                    </Link>
                  </li>
                  <div className="line"></div>
                  <li onClick={toggleMenu}>
                    <Link to="/about" className="nav-link">
                      About us
                    </Link>
                  </li>
                  <div className="line"></div>
                  <li className="contact" onClick={toggleMenu}>
                    <Link to="/contact" className="nav-link">
                      Contact Us
                    </Link>
                  </li>
                  <div className="line"></div>
                  <li onClick={toggleMenu}>
                    <Link to="/reviews" className="nav-link">
                      Reviews
                    </Link>
                  </li>
                  <div className="line"></div>

                  <li style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                    {user ? (
                      <Link
                        to="#"
                        className="nav-link text-white"
                        onClick={toggleMenu}
                      >
                        <a
                          onClick={() => {
                            signout(() => {
                              toast.success('Signout Successfully')
                              history.push('/')
                            })
                          }}
                          className="hd-btn  s-menu text-white"
                          style={{ cursor: 'pointer' }}
                        >
                          Logout
                        </a>
                      </Link>
                    ) : (
                      <Link
                        to="/register"
                        className="nav-link text-white"
                        onClick={toggleMenu}
                      >
                        <a
                          className="hd-btn text-white"
                          style={{ cursor: 'pointer' }}
                        >
                          Sign Up
                        </a>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            {/* mobile-menu-area end */}
          </header>
        ))}

      {sites && sites.length == 0 && (
        <header className="header-one">
          {/* Start top bar */}
          <div className="topbar-area fix hidden-xs">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="topbar-left">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-envelope"></i> site@gmail.com
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fas fa-phone"></i> site's phone number
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" col-md-6 col-sm-6">
                  <div className="topbar-right">
                    <div className="top-social">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fa fa-skype"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-google"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End top bar */}
          {/* header-area start */}
          <div
            id="sticker"
            className={
              isScrollValueMoreThanHeaderHeight
                ? 'header-area hidden-xs stick'
                : 'header-area hidden-xs '
            }
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="row">
                    {/* logo start */}
                    <div className="col-md-3 col-sm-3">
                      <div className="logo">
                        {/* Brand */}
                        <Link
                          className="navbar-brand page-scroll white-logo"
                          to="/"
                        >
                          <img src="" alt="site logo" />
                        </Link>
                        <Link
                          className="navbar-brand page-scroll black-logo"
                          to="/"
                        >
                          <img src="" alt="site logo" />
                        </Link>
                      </div>
                      {/* logo end */}
                    </div>
                    <div className="col-md-9 col-sm-9">
                      <div className="header-right-link">
                        {/* search option end */}

                        {user ? (
                          <a
                            onClick={() => {
                              signout(() => {
                                toast.success('Signout Successfully')
                                history.push('/')
                              })
                            }}
                            className="s-menu"
                            style={
                              isScrollValueMoreThanHeaderHeight
                                ? { cursor: 'pointer', marginTop: '10px' }
                                : { cursor: 'pointer' }
                            }
                          >
                            Logout
                          </a>
                        ) : (
                          <Link
                            style={
                              isScrollValueMoreThanHeaderHeight
                                ? { cursor: 'pointer', marginTop: '10px' }
                                : { cursor: 'pointer' }
                            }
                            className="s-menu"
                            to="/login"
                          >
                            Login
                          </Link>
                        )}
                      </div>
                      {/* mainmenu start */}
                      <nav className="navbar navbar-default">
                        <div
                          className="collapse navbar-collapse"
                          id="navbar-example"
                        >
                          <div className="main-menu">
                            <ul className="nav navbar-nav navbar-right">
                              <li>
                                <Link className="pages" to="/">
                                  Home
                                </Link>
                              </li>
                              {user ? (
                                <li>
                                  <Link to="#" onClick={dashboard}>
                                    Dashboard
                                  </Link>
                                </li>
                              ) : null}
                              <li>
                                <Link to="/about">About us</Link>
                              </li>
                              <li>
                                <Link to="/investment">Invest</Link>
                              </li>
                              <li>
                                <Link to="/contact">Contact us</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
                      {/* mainmenu end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* header-area end */}
        </header>
      )}
    </>
  )
}

export default Header
