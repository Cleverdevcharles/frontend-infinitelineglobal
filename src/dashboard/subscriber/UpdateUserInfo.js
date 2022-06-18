import React, { useState, useEffect } from 'react'
import Header from '../../components/navs/header/Header'
import { update, read, updateUser } from '../../functions/user'
import { RegionDropdown, CountryDropdown } from 'react-country-region-selector'
import Input from 'react-phone-number-input/input'
import { isAuthenticated } from '../../functions/auth'
import PageArea from './nav/PageArea'
import SideBar from './nav/SideBar'
import Footer from './nav/Footer'
import { toast } from 'react-toastify'

const UpdateUserInfo = ({ match }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    paymentOption: '',
    cryptoAddress: '',
    cryptoNetwork: '',
    email: '',
    password: '',
    error: false,
  })
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)

  const { user, token } = isAuthenticated()
  const {
    paymentOption,
    cryptoAddress,
    cryptoNetwork,
    email,
    password,
    firstName,
    lastName,
    error,
  } = values

  const init = () => {
    const userId = user._id
    console.log(userId)
    read(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error, data)
        console.log('User Id =>', user._id)
        setValues({ ...values, error: true })
      } else {
        console.log(data)
        console.log(userId)
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.fullName,
          paymentOption: data.paymentOption,
          cryptoAddress: data.cryptoAddress,
          cryptoNetwork: data.cryptoNetwork,
          email: data.email,
          password: data,
        })
        setPhone(data.phone)
        setCountry(data.country)
        setState(data.state)
      }
    })
  }

  useEffect(() => {
    const userId = match.params.userId
    init(userId)
  }, [])

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setProcessing(true)
    const strongRegexSpecialCharacter = /^(.*\W).*$/
    if (!firstName && !lastName && !phone && !country && !state) {
      toast.error('Please update at least one field')
      setProcessing(false)
      return
    }
    if (!state) {
      toast.error('State is required.')
      setProcessing(false)
      return
    }
    if (!country) {
      toast.error('Country is required.')
      setProcessing(false)
      return
    }
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

    if (strongRegexSpecialCharacter.test(lastName)) {
      toast.error("Last name can't contain any special character.")
      setProcessing(false)
      return
    }

    update(user._id, token, {
      firstName,
      lastName,
      fullName: firstName.trim() + ' ' + lastName.trim(),
      email,
      phone,
      country,
      state,
      paymentOption,
      cryptoAddress,
      cryptoNetwork,
    }).then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error)
        console.log(data)
        toast.error(data.error)
        setLoading(false)
      } else {
        updateUser(data, () => {
          setLoading(false)
          setValues({
            ...values,
            firstName: '',
            lastName: '',
            phone: '',
            state: '',
            country: '',
            email: data.email,
            success: true,
          })
        })
        setLoading(false)
        toast.success('Profile updated successfully.')
      }
    })
  }

  return (
    <>
      <Header />
      <main>
        <PageArea />
        <div className="notify-overlay"></div>
        <div className="notify-overlay"></div>
        <div className="dsahboard-area bg-color area-padding">
          <div className="container">
            <div className="row">
              <SideBar />
              <div className="col-xl-9 col-lg-9 col-md-8">
                <div className="login-area area-padding fix">
                  <div className="login-overlay"></div>
                  <div className="table">
                    <div className="table-cell">
                      <div className="container">
                        <div className="row justify-content-center text-center ml-5">
                          <div className="col-xl-9 col-lg-9 col-md-6">
                            <div className="login-form signup-form">
                              <h4 className="login-title text-center">
                                Update Profile
                              </h4>
                              <div className="row">
                                <form
                                  id="contactForm"
                                  className="log-form"
                                  onSubmit={handleSubmit}
                                  style={{ background: 'transparent' }}
                                >
                                  <div className="col-md-12 col-sm-12 col-xs-12">
                                    <input
                                      type="text"
                                      style={{ display: 'none' }}
                                      value={paymentOption}
                                      name="paymentOption"
                                      className="form-control"
                                    />
                                    <input
                                      type="text"
                                      style={{ display: 'none' }}
                                      value={cryptoAddress}
                                      name="cryptoAddress"
                                      className="form-control"
                                      onSubmit={handleSubmit}
                                    />
                                    <input
                                      type="text"
                                      style={{ display: 'none' }}
                                      value={cryptoNetwork}
                                      name="cryptoNetwork"
                                      className="form-control"
                                      onSubmit={handleSubmit}
                                    />
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
                                      disabled
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

                                  <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="slide-btn login-btn"
                                    style={{ marginTop: '20px' }}
                                  >
                                    {loading ? (
                                      <b>Updating...</b>
                                    ) : (
                                      <b>Update</b>
                                    )}
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default UpdateUserInfo
