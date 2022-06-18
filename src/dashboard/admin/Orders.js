import React, { useEffect, useState } from 'react'
import {
  getStatusValues,
  listOrders,
  updateOrderStatus,
} from '../../functions/order'
import Header from '../../components/navs/header/Header'
import { isAuthenticated } from '../../functions/auth'
import SideBar from './nav/SideBar'
import Footer from './nav/Footer'
import PageArea from './nav/PageArea'
import { toast } from 'react-toastify'
import { read } from '../../functions/user'

const Orders = ({ match }) => {
  const [orders, setOrders] = useState([])
  const [statusValues, setStatusValues] = useState([])
  const [menu, setMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    paymentOption: '',
    cryptoAddress: '',
    cryptoNetwork: '',
    error: false,
  })

  const { paymentOption, cryptoAddress, cryptoNetwork } = values

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
          setValues({
            ...values,
            paymentOption: data.paymentOption,
            cryptoAddress: data.cryptoAddress,
            cryptoNetwork: data.cryptoNetwork,
          })
        } else {
          setValues({
            ...values,
            paymentOption: data.paymentOption,
            cryptoAddress: data.cryptoAddress,
            cryptoNetwork: data.cryptoNetwork,
          })
        }
      }
    })
  }

  useEffect(() => {
    const userId = match.params.userId
    init(userId)
  }, [])

  useEffect(() => {
    const menu = window.localStorage.getItem('Menu')
    setMenu(JSON.parse(menu))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('Menu', JSON.stringify(menu))
  })

  const { user, token } = isAuthenticated()

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

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setStatusValues(data)
      }
    })
  }

  useEffect(() => {
    loadOrders()
    loadStatusValues()
  }, [])

  const showInput = (key, value) => (
    <>
      <div>{key}</div>
      {value}
    </>
  )

  const investorWithdrawalDetails = (
    currency_address,
    currency_option,
    currency_network,
  ) => {
    ;<>
      <td style={{ color: '#fff' }}>{currency_option}</td>
      <td style={{ color: '#fff' }}>{currency_address}</td>
      <td style={{ color: '#fff' }}>{currency_network}</td>
    </>
  }

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        toast.success(`Status update failed`)
        console.log('Status update failed')
      } else {
        loadOrders()
        console.log(data)
        toast.success(`Status update successfully to ${e.target.value}`)
      }
    })
  }

  const showStatus = (o) => (
    <div className="form-group">
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option selected disabled>
          Update Status
        </option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )

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
                      <h3>Loading Investment Order(s), please wait....</h3>
                    ) : (
                      <>
                        {orders.length > 0 ? (
                          <h3>Total Investment Order(s): {orders.length}</h3>
                        ) : (
                          <h3>No investment Order</h3>
                        )}
                      </>
                    )}
                    <ul id="autoWidth" className="cs-hidden">
                      <div
                        className="form-inner table-inner"
                        style={{ overflowX: 'auto' }}
                      >
                        <table
                          style={{ overFlow: 'scroll', whiteSpace: 'nowrap' }}
                        >
                          <tr
                            className="text-white"
                            style={{ background: '#fc0077', color: '#fff' }}
                          >
                            <th>Investor</th>
                            <th>Transaction ID</th>
                            <th>Transaction Hash</th>
                            <th>Currency Option</th>
                            <th>Crypto Address</th>
                            <th>Crypto Network</th>
                            <th>Package</th>
                            <th>Amount</th>
                            <th>Withdrawal Date</th>
                            <th>Status</th>
                          </tr>
                          {orders &&
                            orders.map((o, oIndex) => {
                              return (
                                <>
                                  <tr
                                    key={oIndex}
                                    style={{ backgroundColor: '#0a002ade' }}
                                  >
                                    <td style={{ color: '#fff' }}>
                                      {o.investor}
                                    </td>
                                    <td style={{ color: '#fff' }}>
                                      {o.transaction_id}
                                    </td>
                                    <td style={{ color: '#fff' }}>
                                      {o.currency_option === 'BNB' ? (
                                        <a
                                          href={`https://bscscan.com/tx/${o.transaction_hash}`}
                                          target="_blank"
                                          className="text-white"
                                          style={{
                                            textDecoration: 'underline',
                                            color: '#fff',
                                          }}
                                        >
                                          {o.transaction_hash}
                                        </a>
                                      ) : null}
                                      {o.currency_option === 'ETH' ? (
                                        <a
                                          href={`https://etherscan.io/tx/${o.transaction_hash}`}
                                          target="_blank"
                                          className="text-white"
                                          style={{
                                            textDecoration: 'underline',
                                            color: '#fff',
                                          }}
                                        >
                                          {o.transaction_hash}
                                        </a>
                                      ) : null}
                                      {o.currency_option === 'USDT' ? (
                                        <a
                                          href={`https://tronscan.org/#/address/${o.transaction_hash}`}
                                          target="_blank"
                                          className="text-white"
                                          style={{
                                            textDecoration: 'underline',
                                            color: '#fff',
                                          }}
                                        >
                                          {o.transaction_hash}
                                        </a>
                                      ) : null}
                                      {o.currency_option === 'BTC' ? (
                                        <a
                                          href={`https://blockchain.com/btc/tx/${o.transaction_hash}`}
                                          target="_blank"
                                          className="text-white"
                                          style={{
                                            textDecoration: 'underline',
                                            color: '#fff',
                                          }}
                                        >
                                          {o.transaction_hash}
                                        </a>
                                      ) : null}
                                    </td>
                                    {investorWithdrawalDetails(
                                      paymentOption,
                                      cryptoAddress,
                                      cryptoNetwork,
                                    )}
                                    {o.investmentpackages.map((ip, pIndex) => (
                                      <td key={ip} style={{ color: '#fff' }}>
                                        {showInput(ip.name)}
                                      </td>
                                    ))}
                                    <td style={{ color: '#fff' }}>
                                      ${o.amount}
                                    </td>
                                    <td style={{ color: '#fff' }}>
                                      {o.withdrawalDate}
                                    </td>
                                    <td>{showStatus(o)}</td>
                                  </tr>
                                </>
                              )
                            })}
                        </table>
                      </div>
                    </ul>
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

export default Orders
