import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getPurchaseHistory } from '../../functions/user'
import { isAuthenticated } from '../../functions/auth'
import { listOrders, getStatusValues } from '../../functions/order'
import Header from '../../components/navs/header/Header'
import moment, { duration } from 'moment'
import { toast } from 'react-toastify'
import emailjs from 'emailjs-com'
import SideBar from './nav/SideBar'
import Footer from './nav/Footer'
import PageArea from './nav/PageArea'
import { API } from '../../config'
import { read } from './../../functions/user'
import {
  reduceReferralEarnings,
  updateWithdrawal,
} from '../../functions/withdrawal'

const History = ({ match }) => {
  const [menu, setMenu] = useState(false)
  const [withdrawalRequest, setWithdrawalRequest] = useState(false)
  const [history, setHistory] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [withdraw, setWithdraw] = useState('Withdraw')
  const [values, setValues] = useState({
    referralEarnings: '',
    referralCode: '',
    purchaseHistory: '',
    error: false,
  })
  const [purchaseHistory, setPurchaseHistory] = useState([])

  const form = useRef()
  const referralForm = useRef()

  const { referralEarnings, referralCode, error } = values
  const { user, token } = isAuthenticated()

  const initUser = () => {
    const userId = user._id
    console.log(userId)
    read(userId, token).then((data) => {
      console.log(data)
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        console.log('Upliner: ', data.referralCode)
        if (data.verified) {
          setValues({
            ...values,
            referralCode: data.referralCode,
            purchaseHistory: data.history,
            referralEarnings: data.referralEarnings,
          })
        } else {
          setValues({
            ...values,
            purchaseHistory: data.history,
            referralCode: data.referralCode,
            referralEarnings: data.referralEarnings,
          })
        }
      }
    })
  }

  useEffect(() => {
    const userId = match.params.userId
    initUser(userId)
  }, [])

  const initReferralEarnings = () => {
    const userId = user._id
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        setValues({
          ...values,
          referralCode: data.referralCode,
          referralEarnings: data.referralEarnings,
        })
      }
    })
  }

  useEffect(() => {
    const userId = match.params.userId
    initReferralEarnings(userId)
  }, [])

  const handleWithdrawalRequest = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .sendForm(
        'service_wue3oxa',
        'template_z8ii51u',
        form.current,
        'ZekXOuuaWaw8plzu3',
      )
      .then((res) => {
        console.log(res)
        toast.success('Withdrawal request sent...Please wait for your payment.')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Withdrawal Failed. Please try again.')
      })
  }

  const handleReferralWithdrawal = (e) => {
    e.preventDefault()
    setLoading(true)

    history &&
      history.map((h, i) => {
        h.investmentpackages.map((ip, i) => {
          if (h.status === "Not Verified") {
            return toast.error(
              'Please invest in order to withdraw your referral earnings.',
            )
          }
        })
      })

    reduceReferralEarnings({
      referralCode,
    }).then((data) => {
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        emailjs
          .sendForm(
            'service_wue3oxa',
            'template_z8ii51u',
            referralForm.current,
            'ZekXOuuaWaw8plzu3',
          )
          .then((res) => {
            console.log(res)
            toast.success(
              'Referral withdrawal request sent...Please wait for your payment.',
            )
          })
          .catch((err) => {
            console.log(err)
            toast.error('Referral withdrawal Failed. Please try again.')
          })
        setLoading(false)
      }
    })
  }

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setHistory(data)
      }
    })
  }

  useEffect(() => {
    init(user._id, token)
  }, [])

  var withdrawalCount

  const withdrawalDate = () => {
    var today = new Date()
    var business_days = 14

    var withdrawalDate = today
    var total_days = business_days
    for (var days = 1; days <= total_days; days++) {
      withdrawalDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
      // withdrawalDate.setDate(withdrawalDate.getDate() + parseInt(7));
      if (withdrawalDate.getDay() == 0 || withdrawalDate.getDay() == 6) {
        //it's a weekend day so we increase the total_days of 1
        total_days++
        // counter+1
        if (total_days++) {
          withdrawalCount++
        }
      }

      console.log("TODAY'S DATE: ", today.toLocaleDateString())
      console.log('WITHDRAWAL DATE: ', withdrawalDate.toLocaleDateString())
      if (today.toLocaleDateString() === withdrawalDate.toLocaleDateString()) {
        break
      }
    }
    if (withdrawalDate.toLocaleDateString() === '6/24/2022') {
      setWithdraw('Withdraw')
      console.log('Withdraw: ', 'true')
    }

    return today.toLocaleDateString()
  }

  const handleUpLiner = (referralCode, referralEarnings) => (
    <>
      <input
        type="text"
        name="referralCode"
        style={{ display: 'none' }}
        value={referralCode}
      />
      <input
        type="text"
        name="referralEarnings"
        style={{ display: 'none' }}
        value={referralEarnings}
      />
    </>
  )

  const investmentHistory = (history) => {
    return (
      <>
        <ul id="autoWidth" className="cs-hidden">
          <div className="form-inner table-inner" style={{ overflowX: 'auto' }}>
            <table style={{ overFlow: 'scroll', whiteSpace: 'nowrap' }}>
              <tr
                style={{ background: '#fc0077', color: '#fff' }}
                className="text-white"
              >
                <th>Package ID</th>
                <th>Package Name</th>
                <th>Transaction ID</th>
                <th>Transaction Hash</th>
                <th>Currency Option</th>
                <th>Amount</th>
                <th>Interest</th>
                <th>Withdrawal</th>
              </tr>
              {history.map((h, i) => {
                return (
                  <tbody>
                    <tr key={i}>
                      {h.investmentpackages.map((ip, i) => {
                        return (
                          <>
                            <td>{ip._id}</td>
                            <td>{ip.name}</td>
                            <td>{h.transaction_id}</td>

                            <td style={{ color: '#fff' }}>
                              {h.currency_option === 'BNB' ? (
                                <a
                                  href={`https://bscscan.com/tx/${h.transaction_hash}`}
                                  target="_blank"
                                  className="text-white"
                                  style={{
                                    textDecoration: 'underline',
                                    color: '#000',
                                  }}
                                >
                                  {h.transaction_hash}
                                </a>
                              ) : null}
                              {h.currency_option === 'ETH' ? (
                                <a
                                  href={`https://etherscan.io/tx/${h.transaction_hash}`}
                                  target="_blank"
                                  style={{
                                    textDecoration: 'underline',
                                    color: '#000',
                                  }}
                                >
                                  {h.transaction_hash}
                                </a>
                              ) : null}
                              {h.currency_option === 'USDT' ? (
                                <a
                                  href={`https://tronscan.org/#/address/${h.transaction_hash}`}
                                  target="_blank"
                                  style={{
                                    textDecoration: 'underline',
                                    color: '#000',
                                  }}
                                >
                                  {h.transaction_hash}
                                </a>
                              ) : null}
                              {h.currency_option === 'BTC' ? (
                                <a
                                  href={`https://blockchain.com/btc/tx/${h.transaction_hash}`}
                                  target="_blank"
                                  style={{
                                    textDecoration: 'underline',
                                    color: '#000',
                                  }}
                                >
                                  {h.transaction_hash}
                                </a>
                              ) : null}
                            </td>
                            <td>{h.currency_option}</td>
                            <td>${h.amount}</td>
                            <td>
                              {ip.percentage_interest}% ($
                              {Math.round(
                                (ip.percentage_interest * h.amount) / 100,
                              )}
                              )
                            </td>

                            <td>
                              {withdrawalDate() === h.withdrawalDate ? (
                                <>
                                  <form
                                    ref={form}
                                    onSubmit={handleWithdrawalRequest}
                                  >
                                    <input
                                      type="text"
                                      id="msg_subject"
                                      name="msg_subject"
                                      style={{ display: 'none' }}
                                      value="Referral Withdrawal Request"
                                    />
                                    <input
                                      type="text"
                                      name="name"
                                      style={{ display: 'none' }}
                                      value={`${user.fullName}`}
                                    />
                                    <input
                                      type="text"
                                      name="email"
                                      style={{ display: 'none' }}
                                      value={`${user.email}`}
                                    />
                                    <input
                                      type="text"
                                      name="message"
                                      style={{ display: 'none' }}
                                      value={`New Withdrawal Request From ${
                                        user.fullName
                                      } with ID = ${
                                        user._id
                                      } for a withdrawal of $${Math.round(
                                        (ip.percentage_interest * h.amount) /
                                          100,
                                      )}, 
                                      with a transaction ID = ${
                                        h.transaction_id
                                      }.
                                      Which is ${ip.percentage_interest}% of $${
                                        h.amount
                                      }.
                                      Please make payment and update your orders using this link
                                      ${API}/admin-investment-orders`}
                                    />
                                    {/* <div>{counter}</div> */}
                                    {h.status === 'Not Verified' ? (
                                      <>
                                        <button
                                          disabled
                                          style={{ background: 'transparent' }}
                                        >
                                          Not Verified
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="submit"
                                          className="form-control"
                                          disabled={
                                            h.status === 'Paid' ? true : false
                                          }
                                          style={
                                            h.status === 'Paid'
                                              ? { backgroundColor: 'gray' }
                                              : {
                                                  background: 'green',
                                                  color: '#fff',
                                                }
                                          }
                                        >
                                          {h.status === 'Paid' ? (
                                            <>Paid</>
                                          ) : (
                                            <span>{withdraw}</span>
                                          )}
                                        </button>
                                      </>
                                    )}
                                  </form>
                                </>
                              ) : (
                                <>
                                  {h.status === 'Verified' ? (
                                    <>{h.withdrawalDate}</>
                                  ) : (
                                    <>{h.status}</>
                                  )}
                                </>
                              )}
                            </td>
                          </>
                        )
                      })}
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        </ul>
      </>
    )
  }

  const formatCalendarDate = (dateTime) => {
    return moment.utc(dateTime).format('LLL')
  }

  const getWithdrawalDate = (dateIn) => {
    var today = new Date()
    var business_days = 14

    var withdrawalDate = today
    var total_days = business_days
    for (var days = 1; days <= total_days; days++) {
      withdrawalDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      var confirmWithdrawalDate = new Date(
        today.getTime() + days * 24 * 60 * 60 * 1000,
      )
      // withdrawalDate.setDate(withdrawalDate.getDate() + parseInt(7));
      if (withdrawalDate.getDay() == 0 || withdrawalDate.getDay() == 6) {
        //it's a weekend day so we increase the total_days of 1
        total_days++
      }
    }
    console.log(today)
    console.log(withdrawalDate)

    return today.toLocaleDateString()
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
                <div className="send-money-form transection-log">
                  <div className="form-text">
                    {loading ? (
                      <h3>Loading Investments, please wait....</h3>
                    ) : (
                      <>
                        <h3>Investments</h3>
                      </>
                    )}
                    {investmentHistory(history)}
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-8">
                <div class="login-area area-padding fix">
                  <div class="login-overlay"></div>
                  <div class="table">
                    <div class="table-cell">
                      <div class="container">
                        <div class="row justify-content-center text-center ml-5">
                          <div class="col-xl-9 col-lg-9 col-md-6">
                            <div class="login-form signup-form">
                              <h4 class="login-title text-center">
                                Withdraw Referral Earnings
                              </h4>
                              <div class="row">
                                <form
                                  id="contactForm"
                                  className="log-form"
                                  ref={referralForm}
                                  onSubmit={handleReferralWithdrawal}
                                  style={{ background: 'transparent' }}
                                >
                                  {handleUpLiner(referralCode)}
                                  <input
                                    type="text"
                                    id="msg_subject"
                                    name="msg_subject"
                                    style={{ display: 'none' }}
                                    value="Referral Withdrawal Request"
                                  />
                                  <input
                                    type="text"
                                    name="name"
                                    style={{ display: 'none' }}
                                    value={`${user.fullName}`}
                                  />
                                  <input
                                    type="text"
                                    name="email"
                                    style={{ display: 'none' }}
                                    value={`${user.email}`}
                                  />
                                  <input
                                    type="text"
                                    name="message"
                                    style={{ display: 'none' }}
                                    value={`New Referral Withdrawal Request From ${user.fullName} 
                                    with ID = ${user._id} for a referral withdrawal of 
                                    $${referralEarnings}, Please make payment.`}
                                  />
                                  <button
                                    type="submit"
                                    className="slide-btn login-btn"
                                    style={{ marginTop: '20px' }}
                                  >
                                    {loading ? 'Processing...' : withdraw}
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

export default History
