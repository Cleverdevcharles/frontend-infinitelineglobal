import React from 'react'

function HowToStart() {
  return (
    <div className="how-to-area bg-color area-padding">
      <div className="container">
        <center>
          <h1>How to start</h1>
          <h4>
            We focused majorly on growing your financial assets with unbeatable
            rates as return on investment (ROI).
          </h4>
        </center>
        <br />
        <div className="row">
          <div className="all-services">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="support-services first-item">
                <div className="well-img">
                  <a className="support-images" href="#">
                    <i className="flaticon-034-reward"></i>
                  </a>
                </div>
                <div className="main-wel">
                  <div className="wel-content">
                    <h3>Create an account</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="support-services ">
                <div className="well-img">
                  <a className="support-images" href="#">
                    <i className="flaticon-042-wallet"></i>
                  </a>
                </div>
                <div className="main-wel">
                  <div className="wel-content">
                    <h3>Verify account</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="support-services thired-item">
                <div className="well-img">
                  <a className="support-images" href="#">
                    <i className="flaticon-004-bar-chart"></i>
                  </a>
                </div>
                <div className="main-wel">
                  <div className="wel-content">
                    <h3>Choose invest Plan</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToStart
