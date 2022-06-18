import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BACKEND_API } from '../../../config'
import { isAuth } from '../../../helpers/auth'
// import { getCategories, getSites } from "../../apiCore";
// import Site from "../../card/Site";
import './ForgetPassword.css'

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: '' })
  const { email } = formData
  const [processing, setProcessing] = useState('')
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    if (email) {
      axios
        .put(`${BACKEND_API}/forgotpassword`, {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: '',
          })
          console.log(res.data)
          toast.success(res.data.message)
          setProcessing(false)
        })
        .catch((err) => {
          if (err.response.data.errors === 'Must be a valid email address') {
            toast.error('Your email address is badly formatted.')
            console.log(err.response)
          } else {
            toast.error(err.response.data.error)
            console.log(err.response)
          }
        })
      setProcessing(false)
    } else {
      toast.error('Please provide your verified email address.')
      setProcessing(false)
    }
  }

  return (
    <>
      {isAuth() ? <Redirect to="/" /> : null}
      <div class="login-area area-padding fix" style={{ height: '100vh' }}>
        <div class="login-overlay"></div>
        <div class="table">
          <div class="table-cell">
            <div class="container">
              <div class="row">
                <div class="col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8 col-xs-12">
                  <div class="login-form">
                    <h4 class="login-title text-center">Forgot Password</h4>
                    <div class="row">
                      <form
                        id="contactForm"
                        class="log-form"
                        onSubmit={handleSubmit}
                      >
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="email"
                            id="name"
                            className="form-control"
                            value={email}
                            onChange={handleChange('email')}
                            placeholder="Please enter your verified email"
                          />
                        </div>

                        <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                          <button
                            type="submit"
                            id="submit"
                            className="slide-btn login-btn"
                          >
                            {processing ? (
                              <div className="spinner" id="spinner"></div>
                            ) : (
                              <b>Submit</b>
                            )}
                          </button>
                          <div
                            id="msgSubmit"
                            class="h3 text-center hidden"
                          ></div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                          <div class="clear"></div>
                          <div class="sign-icon">
                            <div class="acc-not">
                              Can remember password?{' '}
                              <Link to="/login">Login</Link>
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

export default ForgetPassword
