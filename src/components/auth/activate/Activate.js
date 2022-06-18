import axios from 'axios'
import jwt from 'jsonwebtoken'
import { React, useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BACKEND_API } from '../../../config'
import { referralPost } from '../../../functions/auth'
import { isAuth } from '../../../helpers/auth'
import './Activate.css'

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true,
  })

  const [processing, setProcessing] = useState('')

  useEffect(() => {
    let token = match.params.token
    let { fullName, upLiner } = jwt.decode(token)
    if (token) {
      setFormData({ ...formData, fullName, upLiner, token })
    }
    console.log(token, fullName, upLiner)
  }, [match.params])

  const { fullName, token, show, upLiner } = formData

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    axios
      .post(`${BACKEND_API}/verified`, {
        token,
      })
      .then((res) => {
        setFormData({
          ...formData,
          show: false,
        })
        toast.success(res.data.message)
        referralPost({
          referralCode: upLiner,
        }).then((error) => {
          if (error && error.status === 'FAILED') {
            setProcessing(false)
          } else {
            setFormData({
              ...formData,
              show: false,
            })
            setProcessing(false)
          }
        })
        setProcessing(false)
      })
      .catch((err) => {
        toast.error(err.response.data.errors)
        console.log(err)
        setProcessing(false)
      })
  }

  return (
    <>
      {isAuth() ? <Redirect to="/" /> : null}
      <div className="login-area area-padding fix" style={{ height: '100vh' }}>
        <div className="login-overlay"></div>
        <div className="table">
          <div className="table-cell">
            <div className="container">
              <div className="row">
                <div className="col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8 col-xs-12">
                  <div className="login-form">
                    <h5 className="login-title text-center">
                      Welcome back {fullName}
                    </h5>
                    <div className="row">
                      <form
                        id="contactForm"
                        className="log-form"
                        onSubmit={handleSubmit}
                      >
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          <input
                            type="text"
                            name="upLiner"
                            value={upLiner}
                            style={{ display: 'none' }}
                          />
                          <button
                            type="submit"
                            id="submit"
                            className="slide-btn login-btn"
                          >
                            {processing ? (
                              <div className="spinner" id="spinner"></div>
                            ) : (
                              <b>Activate</b>
                            )}
                          </button>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          <div className="clear"></div>
                          <div className="sign-icon">
                            <div className="acc-not" style={{ color: '#fff' }}>
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

export default Activate
