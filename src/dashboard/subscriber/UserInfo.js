import React, { useEffect, useState } from 'react'
import Header from '../../components/navs/header/Header'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../functions/auth'
import { read } from '../../functions/user'
import SideBar from './nav/SideBar'
import Footer from './nav/Footer'
import { API } from '../../config'
import PageArea from './nav/PageArea'

const UserInfo = ({ match }) => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    referralCode: '',
    state: '',
    country: '',
    paymentOption: '',
    cryptoAddress: '',
    cryptoNetwork: '',
    verified: '',
    password: '',
    error: false,
  })
  const { user, token } = isAuthenticated()
  const {
    fullName,
    email,
    password,
    phone,
    role,
    referralCode,
    paymentOption,
    cryptoAddress,
    cryptoNetwork,
    state,
    verified,
    country,
  } = values

  const init = () => {
    const userId = user._id
    console.log(userId)
    read(userId, token).then((data) => {
      if (data.error) {
        console.log(token)
        console.log(data)
        setValues({ ...values, error: true })
      } else {
        console.log(data)
        if (data.verified) {
          const verifiedUser = 'Yes'
          setValues({
            ...values,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            state: data.state,
            country: data.country,
            role: data.role,
            paymentOption: data.paymentOption,
            cryptoAddress: data.cryptoAddress,
            cryptoNetwork: data.cryptoNetwork,
            verified: verifiedUser,
            referralCode: data.referralCode,
            password: data,
          })
        } else {
          setValues({
            ...values,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            state: data.state,
            country: data.country,
            role: data.role,
            paymentOption: data.paymentOption,
            cryptoAddress: data.cryptoAddress,
            cryptoNetwork: data.cryptoNetwork,
            verified: 'Not verified',
            referralCode: data.referralCode,
            password: data,
          })
        }
      }
    })
  }

  useEffect(() => {
    const userId = match.params.userId
    init(userId)
  }, [])

  const ProfileInfo = (
    fullName,
    email,
    password,
    phone,
    role,
    referralCode,
    state,
    verified,
    country,
    paymentOption,
    cryptoAddress,
    cryptoNetwork,
  ) => (
    <main>
      <PageArea/>
      <div className="notify-overlay"></div>
      <div className="dsahboard-area bg-color area-padding">
        <div className="container">
          <div className="row">
            <SideBar />
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="user-info-inner">
                <div className="user-info-inner_header">
                  <h3
                    className="user-info-card__title"
                    style={{ color: '#fff' }}
                  >
                    Personal Details
                  </h3>
                  <Link to={`/admin-dashboard-update-info-${user._id}`}>
                    <button type="button">
                      <i className="ti-pencil-alt"></i> Edit
                    </button>
                  </Link>
                </div>
                <ul className="user-info-inner_list">
                  <li>
                    <span className="caption">Name</span>
                    <span className="value">{fullName}</span>
                  </li>
                  <li>
                    <span className="caption">Email</span>
                    <span className="value">{email}</span>
                  </li>
                  <li>
                    <span className="caption">Phone</span>
                    <span className="value">{phone}</span>
                  </li>
                  <li>
                    <span className="caption">Country</span>
                    <span className="value">{country}</span>
                  </li>
                  <li>
                    <span className="caption">Role</span>
                    <span className="value">{role}</span>
                  </li>
                  <li>
                    <span className="caption">Verified</span>
                    <span className="value">{verified}</span>
                  </li>
                  <li>
                    <span className="caption">State/Region</span>
                    <span className="value">{state}</span>
                  </li>
                  <li>
                    <span className="caption">Ref.Link</span>
                    <span className="value">
                      {API}/register?code={referralCode}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="user-info-inner">
                <div className="user-info-inner_header">
                  <h3
                    className="user-info-card__title"
                    style={{ color: '#fff' }}
                  >
                    Withdrawal Details
                  </h3>
                  <Link to={`/dashboard-update-payment-info-${user._id}`}>
                    <button type="button">
                      <i className="ti-pencil-alt"></i> Edit
                    </button>
                  </Link>
                </div>
                <ul className="user-info-inner_list">
                  <li>
                    <span className="caption">Payment Option</span>
                    <span className="value">{paymentOption}</span>
                  </li>
                  <li>
                    <span className="caption">Address</span>
                    <span className="value">
                      <input disabled
                      style={{border: "none", width: "100%", background: "transparent"}}
                      type="text" value={cryptoAddress}/>
                    </span>
                  </li>
                  <li>
                    <span className="caption">Network</span>
                    <span className="value">{cryptoNetwork}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
  return (
    <>
      <Header />
      {ProfileInfo(
        fullName,
        email,
        password,
        phone,
        role,
        referralCode,
        state,
        verified,
        country,
        paymentOption,
        cryptoAddress,
        cryptoNetwork,
      )}
      <Footer />
    </>
  )
}

export default UserInfo
