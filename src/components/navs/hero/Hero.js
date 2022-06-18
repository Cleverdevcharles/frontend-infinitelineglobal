import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getSites } from '../../../functions/site'
import { isAuthenticated } from '../../../functions/auth'
import ModalVideo from 'react-modal-video'

function Hero() {
  const [sites, setSites] = useState([])
  const [sitesByArrival, setSitesByArrival] = useState([])
  const [error, setError] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const loadSitesByArrival = () => {
    getSites('createdAt').then((data) => {
      if (data && data.error) {
        setError(data.error)
      } else {
        setSitesByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadSitesByArrival()
  }, [])

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

  const { user } = isAuthenticated()

  return (
    <>
      <div
        className="slide-area fix"
        dataStellarBackgroundRatio="0.6"
        style={{ height: '100vh' }}
      >
        <div className="display-table">
          <div className="display-table-cell">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  {/* Start Slider content */}
                  <div className="slide-content text-center">
                    <h2 className="title2">Best secure investment plan</h2>
                    <div className="layer-1-3">
                      {user ? (
                        <Link to="/investment" className="ready-btn left-btn">
                          Invest Now
                        </Link>
                      ) : (
                        <Link to="/register" className="ready-btn left-btn">
                          Get Started
                        </Link>
                      )}
                      <div className="video-content">

                        <a
                          href="#video"
                          className="video-play vid-zone"
                          onClick={() => setOpen(true)}
                        >
                          <i className="fa fa-play"></i>
                          <span>watch video</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End Slider content */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
