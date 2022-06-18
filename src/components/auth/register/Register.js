import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isAuthenticated, signup } from '../../../functions/auth'
import { RegionDropdown, CountryDropdown } from 'react-country-region-selector'
import Input from 'react-phone-number-input/input'
import './Register.css'
let searchParams = new URLSearchParams(window.location.search);

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    referralCode: '',
    upLiner: searchParams.get('code'),
    password1: '',
    password2: '',
  })
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('')
  const [term_condition, setTerm_condition] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false)
  const [processing, setProcessing] = useState('')

  const history = useHistory()
  const { user } = isAuthenticated()

  const toggleRegisterVisiblity = () => {
    setTerm_condition(term_condition ? false : true)
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmpasswordShown ? false : true)
  }

  const {
    firstName,
    lastName,
    email,
    referralCode,
    password1,
    password2,
    upLiner
  } = formData
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value })
  }

 
  const register = (e) => {
    e.preventDefault()
    setProcessing(true)
    const strongRegexSpecialCharacter = /^(.*\W).*$/

    if (!firstName) {
      toast.error('First name is required.')
      setProcessing(false)
      return
    }
    if (strongRegexSpecialCharacter.test(firstName)) {
      toast.error("First name can't contain any special character.")
      setProcessing(false)
      return
    }
    if (!lastName) {
      toast.error('Last name is required.')
      setProcessing(false)
      return
    }
    if (strongRegexSpecialCharacter.test(lastName)) {
      toast.error("Last name can't contain any special character.")
      setProcessing(false)
      return
    }

    if (!email) {
      toast.error('Valid email is required.')
      setProcessing('')
      return
    }
    if (!phone) {
      toast.error('Phone number is required.')
      setProcessing('')
      return
    }
    if (!country) {
      toast.error('Country is required.')
      setProcessing('')
      return
    }
    if (!state) {
      toast.error('State/Region is required.')
      setProcessing('')
      return
    }
    if (!password1) {
      toast.error('Please create your password.')
      setProcessing('')
      return
    }
    if (password1.length < 8) {
      toast.error('Password must be at least 8 characters long.')
      setProcessing('')
      return
    }
    if (password1.length > 32) {
      toast.error('Password must be between 8 to 32 characters long only.')
      setProcessing('')
      return
    }
    const strongRegexHighercase = new RegExp('^(?=.*[A-Z])')
    if (!strongRegexHighercase.test(password1)) {
      toast.error('Password must contain at least an uppercase.')
      setProcessing('')
      return
    }
    const strongRegexLowercase = new RegExp('^(?=.*[a-z])')
    if (!strongRegexLowercase.test(password1)) {
      toast.error('Password must contain at least a lowercase.')
      setProcessing('')
      return
    }
    const strongRegexNumber = new RegExp('^(?=.*[0-9])')
    if (!strongRegexNumber.test(password1)) {
      toast.error('Password must contain at least one number.')
      setProcessing('')
      return
    }
    if (!strongRegexSpecialCharacter.test(password1)) {
      toast.error('Password must contain at least one special character.')
      setProcessing('')
      return
    }
    if (!password2) {
      toast.error('Please confrim your password.')
      setProcessing('')
      return
    }
    if (password2 !== password1) {
      toast.error('Password do not match.')
      setProcessing('')
      return
    }
    var fullname = firstName.trim() + ' ' + lastName.trim()

    signup({
      firstName,
      lastName,
      fullname,
      phone,
      email,
      country,
      state,
      phone,
      referralCode,
      upLiner,
      password: password1,
    }).then((error) => {
      if (error && error.status === 'FAILED') {
        toast.success(error.message)
        setProcessing(false)
      } else {
        toast.success(error.message)
        setFormData({
          ...formData,
          firstName: '',
          lastName: '',
          fullname: '',
          email: '',
          password1: '',
          password2: '',
          referralCode: '',
          upLiner: '',
        })
        setCountry({ ...country, country: '' })
        setState({ ...state, state: '' })
        setPhone({ ...phone, phone: '' })
        setProcessing(false)
      }
    })
  }

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
                    <Link to="/" style={{ color: '#e6922e' }}>
                      Home
                    </Link>
                  </li>
                  <li>Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-area area-padding fix">
        <div className="login-overlay"></div>
        <div className="table">
          <div className="table-cell">
            <div className="container">
              <div className="row">
                <div className="col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8 col-xs-12">
                  <div className="login-form signup-form">
                    <h4 className="login-title text-center">REGISTER</h4>
                    <div className="row">
                      <form id="contactForm" className="">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="name"
                            placeholder="Please enter your firstname"
                            value={firstName}
                            onChange={handleChange('firstName')}
                            name="firstName"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="name"
                            placeholder="Please enter your lastname"
                            value={lastName}
                            onChange={handleChange('lastName')}
                            name="lastName"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your valid e-mail address"
                            value={email}
                            onChange={handleChange('email')}
                            name="email"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <Input
                            placeholder="Enter phone number"
                            className="form-control"
                            value={phone}
                            onChange={setPhone}
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <CountryDropdown
                            value={country}
                            style={{ color: 'grey' }}
                            className="form-control"
                            onChange={setCountry}
                            name="country"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <RegionDropdown
                            disableWhenEmpty={true}
                            country={country}
                            style={{ color: 'grey' }}
                            className="form-control"
                            value={state}
                            onChange={setState}
                            name="state"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type={passwordShown ? 'text' : 'password'}
                            id="password"
                            placeholder="Password"
                            className="form-control"
                            value={password1}
                            onChange={handleChange('password1')}
                            name="password1"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type={confirmpasswordShown ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={handleChange('password2')}
                            name="password2"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Referral Code (Optional)"
                            value={upLiner}
                            onChange={handleChange('upLiner')}
                            name="upLiner"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <p>
                            <small>
                              By registering you agree to our Conditions of Use
                              & Sale. Please see our Privacy Notice, our Cookies
                              Notice and our Interest-Based Ads Notice.
                            </small>
                          </p>
                        </div>
                        <div className="form-check col-md-12 col-sm-12 col-xs-12">
                          <div className="slideThree">
                            <input
                              type="checkbox"
                              onClick={toggleRegisterVisiblity}
                              value="None"
                              id="slideThree"
                              name="check"
                            />
                            <label htmlFor="slideThree"></label>
                          </div>
                        </div>

                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          {term_condition ? (
                            <button
                              type="submit"
                              onClick={register}
                              className="slide-btn login-btn"
                              style={{ marginTop: '20px' }}
                            >
                              {processing ? (
                                <div className="spinner" id="spinner"></div>
                              ) : (
                                <b>Register</b>
                              )}
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled
                              className="register__registerButton"
                              style={{
                                backgroundColor: '#f1d690',
                                height: '50px',
                                paddingTop: '15px',
                                paddingBottom: '20px',
                              }}
                            >
                              <b>
                                Kindly agree to our Conditions of Use & Sale.
                              </b>
                            </button>
                          )}
                          <div
                            id="msgSubmit"
                            className="h3 text-center hidden"
                          ></div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          <div className="clear"></div>
                          <div className="sign-icon">
                            <div className="acc-not">
                              Have an account?{' '}
                              <Link to="/login" style={{ color: '#e6922e' }}>
                                Login
                              </Link>
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
      </div>
    </>
  )
}

export default Register
