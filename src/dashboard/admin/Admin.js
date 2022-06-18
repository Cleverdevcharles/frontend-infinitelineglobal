import React, { useEffect, useState } from 'react'
import Header from '../../components/navs/header/Header'
import { isAuthenticated } from '../../functions/auth'
import { getPurchaseHistory } from '../../functions/user'
import Footer from './nav/Footer'
import PageArea from './nav/PageArea'
import SideBar from './nav/SideBar'
import { read } from '../../functions/user'
import { listOrders } from '../../functions/order'

const Admin = ({ match }) => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    referralCode: '',
    state: '',
    country: '',
    referralEarnings: '',
    referrals: '',
    verified: '',
    password: '',
    history: '',
    error: false,
  })
  const [purchaseHistory, setPurchaseHistory] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const { user, token } = isAuthenticated()
  const {
    fullName,
    email,
    password,
    phone,
    role,
    referralCode,
    referralEarnings,
    referrals,
    state,
    verified,
    country,
    history,
  } = values

  const loadOrders = () => {
    setLoading(true)
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
        setLoading(false)
      } else {
        setOrders(data)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const init = () => {
    const userId = user._id
    read(userId, token).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: true })
      } else {
        if (data && data.verified) {
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
            history: data.history,
            referralEarnings: data.referralEarnings,
            referrals: data.referrals,
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
            history: data.history,
            referralEarnings: data.referralEarnings,
            referrals: data.referrals,
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

  const initPurchaseHistory = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPurchaseHistory(data)
      }
    })
  }

  useEffect(() => {
    initPurchaseHistory(user._id, token)
  }, [])

  let totalProfit = 0
  let totalAccumulatedProfit = 0

  purchaseHistory.map((ph, i) => {
    ph.investmentpackages.forEach((ip, i) => {
      if (ph.status === 'Verified' || ph.status === 'Paid') {
        (totalAccumulatedProfit += Math.round(
          (ip.percentage_interest * ph.amount) / 100,
        ))
      }

      if (ph.status === 'Verified') {
        (totalProfit += Number(ph.amount))
      }
    })
  })

  const dashboard = (
    fullName,
    email,
    password,
    phone,
    role,
    referralCode,
    state,
    verified,
    country,
    referralEarnings,
    referrals,
    history,
    purchaseHistory,
  ) => (
    <main>
      <PageArea />
      <div className="notify-overlay"></div>
      <div className="notify-overlay"></div>
      <div className="dsahboard-area bg-color area-padding">
        <div className="container">
          <div className="row">
            <SideBar />
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="row dashboard-content">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="single-dash-head">
                    <div className="dashboard-amount">
                      <div className="amount-content" style={{ color: '#fff' }}>
                        <span className="pro-name">ACCUMULATION PROFIT</span>
                        <span className="pro-money">
                          ${totalAccumulatedProfit + referralEarnings}
                        </span>
                      </div>
                      <div className="invest-tumb">
                        <i className="flaticon-004-bar-chart"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="single-dash-head">
                    <div className="dashboard-amount">
                      <div className="amount-content" style={{ color: '#fff' }}>
                        <span className="pro-name">TOTAL REFERRALS</span>
                        <span className="pro-money">{referrals}</span>
                      </div>
                      <div className="invest-tumb">
                        <i className="flaticon-004-bar-chart"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="single-dash-head">
                    <div className="dashboard-amount">
                      <div className="amount-content" style={{ color: '#fff' }}>
                        <span className="pro-name">AFFILIATE PROFIT</span>
                        <span className="pro-money">${referralEarnings}</span>
                      </div>
                      <div className="invest-tumb">
                        <i className="flaticon-027-money-bag"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="single-dash-head">
                    <div className="dashboard-amount">
                      <div className="amount-content" style={{ color: '#fff' }}>
                        <span className="pro-name">TOTAL CAPITAL</span>
                        <span className="pro-money">${totalProfit}</span>
                      </div>
                      <div className="invest-tumb">
                        <i className="flaticon-027-money-bag"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="single-dash-head">
                    <div className="dashboard-amount">
                      <div className="amount-content" style={{ color: '#fff' }}>
                        <span className="pro-name">TOTAL INVESTMENTS</span>
                        <span className="pro-money">{history.length}</span>
                      </div>
                      <div className="invest-tumb">
                        <i className="flaticon-027-money-bag"></i>
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
  )

  return (
    <>
      <Header />
      {dashboard(
        fullName,
        email,
        password,
        phone,
        role,
        referralCode,
        state,
        verified,
        country,
        referralEarnings,
        referrals,
        history,
        purchaseHistory,
      )}
      <Footer />
    </>
  )
}

export default Admin
