import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from 'react-google-login'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BACKEND_API, FACEBOOK_CLIENT, GOOGLE_CLIENT } from '../../../config'
import { authenticate, isAuthenticated, signin } from '../../../functions/auth'
// import { getCategories, getSites } from "../../apiCore";
// import Site from "../../card/Site";
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
  })
  // const [data, setData] = useState({
  //   categories: [],
  //   category: "",
  //   search: "",
  //   results: [],
  //   searched: false,
  // });
  // const [sitesByArrival, setSitesByArrival] = useState([]);
  // const [sites, setSites] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [facebookLoading, setFacebookLoading] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const { user } = isAuthenticated()
  const history = useHistory()
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }
  const { email, password1 } = formData
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  const sendGoogleToken = (tokenId) => {
    setGoogleLoading(true)
    axios
      .post(`${BACKEND_API}/googlelogin`, {
        idToken: tokenId,
      })
      .then((res) => {
        console.log(res.data)
        informParent(res)
        setGoogleLoading(false)
      })
      .catch((error) => {
        setGoogleLoading(false)
        console.log('GOOGLE SIGNIN ERROR', error.response)
      })
  }

  const informParent = (response) => {
    authenticate(response, () => {})
  }

  // const sendFacebookToken = (userID, accessToken) => {
  //   setFacebookLoading(true);
  //   axios
  //     .post(`${BACKEND_API}/facebooklogin`, {
  //       userID,
  //       accessToken,
  //     })
  //     .then((res) => {
  //       setFacebookLoading(false);
  //       console.log(res.data);
  //       informParent(res);
  //     })
  //     .catch((error) => {
  //       console.log("FACEBOOK SIGNIN ERROR", error.response);
  //       setFacebookLoading(false);
  //     });
  // };

  const responseGoogle = (response) => {
    console.log(response)
    sendGoogleToken(response.tokenId)
  }

  // const responseFacebook = (response) => {
  //   console.log(response);
  //   sendFacebookToken(response.userID, response.accessToken);
  // };

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)

    if (!email && !password1) {
      toast.error('Please fill out all field.')
      setProcessing(false)
      return
    }
    if (!email) {
      toast.error('Please provide your valid email address.')
      setProcessing(false)
      return
    }
    if (!password1) {
      toast.error('Please provide your valid password.')
      setProcessing(false)
      return
    }
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' })

      signin({ email, password: password1 }).then((data) => {
        if (data && data.error) {
          console.log(data.error)
          toast.error(data.error)
          setProcessing(false)
        } else {
          authenticate(data, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
            })
            setProcessing(false)
            user && user.role === 'admin'
              ? history.push('/')
              : history.push('/')
            toast.success(`Hey ${data.user.fullName}, Welcome back!`)
            console.log(data.user)
          })
        }
      })
    } else {
      toast.error('E-mail and Password do not match.')
      setProcessing(false)
    }
  }

  // const loadCategories = () => {
  //   getCategories().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setData({ ...data, categories: data });
  //     }
  //   });
  // };

  // const loadSitesByArrival = () => {
  //   getSites("createdAt").then((data) => {
  //     console.log(data);
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setSitesByArrival(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadCategories();
  //   loadSitesByArrival();
  // }, []);

  // const loadSites = () => {
  //   getSites().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       setSites(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadSites();
  // }, []);

  return (
    <>
      {user ? <Redirect to="/" /> : null}
      {/* Start breadcumb Area */}
      <div className="page-area">
        <div className="breadcumb-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="breadcrumb text-center">
                <div className="section-headline white-headline">
                  <h3>Register</h3>
                </div>
                <ul className="breadcrumb-bg">
                  <li className="home-bread text-white">
                    <Link to="/" style={{color: "#e6922e"}}>
                      Home
                    </Link>
                  </li>
                  <li>Login</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-area page-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="login-page">
                <div className="login-form">
                  <h4 className="login-title">LOGIN</h4>
                  <div className="row">
                    <form
                      id="contactForm"
                      onSubmit={handleSubmit}
                      className="log-form"
                    >
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={handleChange('email')}
                          className="form-control"
                          placeholder="Email Address"
                          required
                          data-error="Please enter your email address"
                        />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input
                          type={passwordShown ? 'text' : 'password'}
                          value={password1}
                          onChange={handleChange('password1')}
                          id="password"
                          className="form-control"
                          placeholder="Password"
                          required
                          data-error="Please enter your password"
                        />
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="check-group flexbox">
                          <label className="check-box">
                            <input
                              type="checkbox"
                              className="check-box-input"
                              style={{color: "#e6922e"}}
                            />
                            <span className="remember-text">Remember me</span>
                          </label>

                          <Link
                            className="text-muted"
                            to="/users-password-forget"
                            style={{color: "#e6922e"}}
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <button type="submit" id="submit" className="login-btn">
                          {processing ? (
                            <div className="spinner" id="spinner"></div>
                          ) : (
                            <b>Login</b>
                          )}
                        </button>
                        <div
                          id="msgSubmit"
                          className="h3 text-center hidden"
                        ></div>
                        <div className="clearfix"></div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="clear"></div>
                        <div className="sign-icon">
                          <div className="acc-not">
                            Don't have an account{' '}
                            <Link to="/register" style={{color: "#e6922e"}}> Register Now</Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
