import React, { useEffect, useState } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Plan from '../hero/Plan'
import { isAuthenticated } from '../../../functions/auth'
import { read } from '../../../functions/user'
import { toast } from 'react-toastify'
import { isAuth } from './../../../helpers/auth';

const Investment = ({ match, history }) => {
  const [values, setValues] = useState({
    paymentOption: '',
    error: false,
  })
  const { user, token } = isAuthenticated()

  const { paymentOption } = values

  const init = () => {
    const userId = user._id

    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        if (data.verified) {
          setValues({
            ...values,
            paymentOption: data.paymentOption,
          })
          if (!data.paymentOption) {
            if (user.role === 'Admin') {
              history.push('/admin-dashboard-user-info')
              toast.error('Please update your withdrawal details.')
              return
            }
            history.push('/dashboard-user-info')
            toast.error('Please update your withdrawal details.')
            return
          }
        } else {
          setValues({
            ...values,
            paymentOption: data.paymentOption,
          })
        }
      }
    })
  }

  useEffect(() => {
    if(user){
      const userId = match.params.userId
      init(userId)
    }
  }, [])


  return (
    <>
      <Header />
      <div class="page-area">
        <div class="breadcumb-overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="breadcrumb text-center">
                <div class="section-headline">
                  <h2 style={{ color: '#fff' }}>Investment plan</h2>
                </div>
                <ul>
                  <li class="home-bread">Home</li>
                  <li>Investment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Plan />
      <Footer />
    </>
  )
}

export default Investment
