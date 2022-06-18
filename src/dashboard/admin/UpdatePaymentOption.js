import React, { useState, useEffect } from 'react'
import Header from '../../components/navs/header/Header'
import { update, read, updateUser } from '../../functions/user'
import { isAuthenticated } from '../../functions/auth'
import PageArea from './nav/PageArea'
import SideBar from './nav/SideBar'
import Footer from './nav/Footer'
import { toast } from 'react-toastify'

const UpdatePaymentOption = ({ match }) => {
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
          cryptoAddress: data.cryptoAddress,
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

    if (!paymentOption) {
      setProcessing(false)
      return toast.error('Payment option is required.')
    }
    if (!cryptoAddress) {
      setProcessing(false)
      return toast.error('Crypto address is required.')
    }
    if (!cryptoNetwork) {
      setProcessing(false)
      return toast.error('Crypto network is required.')
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
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        updateUser(data, () => {
          setLoading(false)
          setValues({
            ...values,
            paymentOption: '',
            cryptoAddress: '',
            cryptoNetwork: '',
            success: true,
          })
        })
        setLoading(false)
        toast.success('Payment details updated successfully.')
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
                                Update Payment Details
                              </h4>
                              <div className="row">
                                <form
                                  id="contactForm"
                                  className="log-form"
                                  onSubmit={handleSubmit}
                                  style={{ background: 'transparent' }}
                                >
                                  <div className="col-md-12 col-sm-12 col-xs-12">
                                    <select
                                      className="form-control"
                                      required
                                      onChange={handleChange('paymentOption')}
                                      value={paymentOption}
                                      name="paymentOption"
                                    >
                                      <option selected>
                                        SELECT PAYMENT OPTION
                                      </option>
                                      <option value="USDT">USDT</option>
                                      <option value="BTC">BTC</option>
                                      <option value="BNB">BNB</option>
                                      <option value="ETH">ETH</option>
                                    </select>
                                  </div>
                                  <div className="col-md-12 col-sm-12 col-xs-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter your network"
                                      value={cryptoNetwork}
                                      required
                                      onChange={handleChange('cryptoNetwork')}
                                      name="cryptoNetwork"
                                    />
                                  </div>
                                  <div className="col-md-12 col-sm-12 col-xs-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      required
                                      placeholder="Enter your wallet address"
                                      value={cryptoAddress}
                                      onChange={handleChange('cryptoAddress')}
                                      name="cryptoAddress"
                                    />
                                  </div>

                                  <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="slide-btn login-btn col-md-12 col-sm-12 col-xs-12"
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

export default UpdatePaymentOption
