import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BACKEND_API } from '../../../config'
import { getSites } from '../../../functions/site'

const Footer = () => {
  const [sites, setSites] = useState([])

  const loadSites = () => {
    getSites().then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setSites(data)
      }
    })
  }

  useEffect(() => {
    loadSites()
  }, [])
  return (
    <>
      {sites &&
        sites.length > 0 &&
        sites.map((s, i) => (
          <footer className="footer1">
            <div className="footer-area">
              <div className="container">
                <div className="row">
                  <div className="col-md-5 col-sm-5 col-xs-12">
                    <div className="footer-content logo-footer">
                      <div className="footer-head">
                        <div className="footer-logo">
                          <a className="footer-black-logo" href="#">
                            <img
                              src={`${BACKEND_API}/site/logo/${s._id}`}
                              alt={s.name}
                              width="100px"
                              height="60px"
                              style={{ objectFit: 'cover' }}
                            />
                          </a>
                        </div>
                        <p>{s.about}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-3 col-xs-12">
                    <div className="footer-content">
                      <div className="footer-head">
                        <h4>Services Link</h4>
                        <ul className="footer-list">
                          <li>
                            <Link to="/about">About</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact</Link>
                          </li>
                          <li>
                            <Link to="/investment">Investment</Link>
                          </li>
                        </ul>
                        <ul className="footer-list hidden-sm"></ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-4 col-xs-12">
                    <div className="footer-content last-content">
                      <div className="footer-head">
                        <h4>Information</h4>
                        <div className="footer-contacts">
                          <p>
                            <span>Tel :</span> {s.phone}
                          </p>
                          <p>
                            <span>Email :</span> {s.email}
                          </p>
                        </div>
                        <div className="footer-icons">
                          <ul>
                            <li>
                              <a href={`${s.facebook_url}`} target="_blank">
                                <i className="fab fa-facebook"></i>
                              </a>
                            </li>
                            <li>
                              <a href={`${s.twitter_url}`} target="_blank">
                                <i className="fab fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a href={`${s.whatsapp_url}`} target="_blank">
                                <i className="fab fa-whatsapp"></i>
                              </a>
                            </li>
                            <li>
                              <a href={`${s.instagram_url}`} target="_blank">
                                <i className="fab fa-instagram"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-area-bottom">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="copyright">
                      <p>
                        Copyright © 2022
                        <a href="#"> {s.name}</a> All Rights Reserved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        ))}

      {sites && sites.length == 0 && (
        <footer className="footer1">
          <div className="footer-area">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-5 col-xs-12">
                  <div className="footer-content logo-footer">
                    <div className="footer-head">
                      <div className="footer-logo">
                        <a className="footer-black-logo" href="#">
                          <img src="img/logo/logo.png" alt="" />
                        </a>
                      </div>
                      <p>About site</p>
                      <div className="subs-feilds">
                        <div className="suscribe-input">
                          <input
                            type="email"
                            className="email form-control width-80"
                            id="sus_email"
                            placeholder="Type Email"
                          />
                          <button
                            type="submit"
                            id="sus_submit"
                            className="add-btn"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end single footer */}
                <div className="col-md-4 col-sm-3 col-xs-12">
                  <div className="footer-content">
                    <div className="footer-head">
                      <h4>Services Link</h4>
                      <ul className="footer-list">
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact Us </Link>
                        </li>
                        <li>
                          <Link to="/investment">Investment</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* end single footer */}
                <div className="col-md-3 col-sm-4 col-xs-12">
                  <div className="footer-content last-content">
                    <div className="footer-head">
                      <h4>Information</h4>
                      <div className="footer-contacts">
                        <p>
                          <span>Tel :</span> site phone contact
                        </p>
                        <p>
                          <span>Email :</span> site gmail
                        </p>
                      </div>
                      <div className="footer-icons">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-google"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-pinterest"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-area-bottom">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="copyright">
                    <p>
                      Copyright © 2022
                      <a href="#">site name</a> All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}

export default Footer
