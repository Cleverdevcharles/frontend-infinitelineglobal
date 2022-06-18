import React, { useRef, useState } from 'react'
import Counter from '../navs/hero/Counter'
import Footer from '../navs/footer/Footer'
import Header from '../navs/header/Header'
import Hero from '../navs/hero/Hero'
import WhyChooseUs from '../navs/hero/WhyChooseUs'
import HowToStart from '../navs/hero/HowToStart'
import Plan from '../navs/hero/Plan'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import video from '../navs/hero/video/video.mp4'
import { toast } from 'react-toastify'

function Home() {
  const [send, setSend] = useState('Send')

  const form = useRef()

  const sendMail = (e) => {
    e.preventDefault()
    setSend('Sending...')
    emailjs
      .sendForm(
        'service_wue3oxa',
        'template_z8ii51u',
        form.current,
        'ZekXOuuaWaw8plzu3',
      )
      .then((res) => {
        console.log(res)
        toast.success(
          'Message sent....we will get back to you as soon as possible.',
        )
        setTimeout(() => {
          setSend('Send')
          window.location.reload()
        }, 5000)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Message Failed. Please try again.')
        setTimeout(() => {
          setSend('Send')
          window.location.reload()
        }, 5000)
      })
  }
  return (
    <>
      <Header />
      <Hero />
      <Counter />
      <Plan />
      <HowToStart />

      <div className="self-area area-padding" id="video">
        <div className="container">
          <div className="row">
            {/* column end */}
            <div className="col-md-6 col-sm-6 col-xs-12"></div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="self-content">
                <video controls autoplay style={{ width: '100%' }}>
                  <source src={video} type="video/webm" />
                  <source src={video} type="video/mp4" />
                  Sorry, your browser doesn't support embedded videos.
                </video>
                <h4>
                  An investment multi-national firm is an invest money of one or
                  more experts. Provides more profit, We help your satele to
                  future life and then create the road. Grow Money speedly
                  without any risk.
                </h4>
              </div>
            </div>
            {/* column end */}
          </div>
        </div>
      </div>
      <WhyChooseUs />
      <div className="banner-area area-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="banner-all area-80 text-center">
                <div className="banner-content">
                  <h3>
                    Investing Strategy for development of global business
                    relations.
                  </h3>
                  <Link className="banner-btn" to="/contact">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews-area fix area-padding">
        <div className="container">
          <div className="row">
            <div className="reviews-top">
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="testimonial-inner">
                  <div className="review-head">
                    <h3>Our customer say about our company work</h3>
                    <p>
                      At ILG we exceed clients’ expectations. Infiniteline
                      Global has raised EUR 61 billion of Assets, and Glade
                      Trade Ltd have invested in more than 240 portfolio
                      companies, through 31 separate funds across several
                      business lines.
                    </p>
                    <Link className="reviews-btn" to="/reviews">
                      More reviews
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-sm-7 col-xs-12">
                <div className="reviews-content">
                  {/* start testimonial carousel */}
                  <div className="testimonial-carousel item-indicator">
                    <div className="single-testi">
                      <div className="testi-text">
                        <div className="clients-text">
                          <div className="client-rating">
                            <a href="#">
                              <i className="ti-star"></i>
                            </a>
                            <a href="#">
                              <i className="ti-star"></i>
                            </a>
                            <a href="#">
                              <i className="ti-star"></i>
                            </a>
                            <a href="#">
                              <i className="ti-star"></i>
                            </a>
                            <a href="#">
                              <i className="ti-star"></i>
                            </a>
                          </div>
                          <p>
                            Good Customer Service -Regular Updates -No need to
                            refer any other website if you’re following them
                            -They’ll help you to invest better and stay
                            invested. They’ll guide from them beginning. -So
                            even beginners can blindly go ahead with them and
                            learn a lot.
                          </p>
                        </div>
                        <div className="testi-img ">
                          {/* <img src="img/review/1.jpg" alt="" /> */}
                          <div className="guest-details">
                            <h4>Hamilton</h4>
                            <span className="guest-rev">
                              Clients - <a href="#">General customer</a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End single item */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="faq" className="faq-area bg-color area-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="section-headline text-center">
                <h3>Some important FAQ</h3>
                <p>
                  We are commited to creating exxeptional transparency, clarity
                  and dedication in the business envronment.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Start Column Start */}
            <div className="col-md-7 col-sm-6 col-xs-12">
              <div className="company-faq">
                <div className="faq-full">
                  <div className="faq-details">
                    <div className="panel-group" id="accordion">
                      {/* Panel Default */}
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="check-title">
                            <a
                              data-toggle="collapse"
                              className="active"
                              data-parent="#accordion"
                              href="#check1"
                            >
                              <span className="acc-icons"></span>What Is IGL
                              About?
                            </a>
                          </h4>
                        </div>
                        <div id="check1" className="panel-collapse collapse in">
                          <div className="panel-body">
                            <p>
                              Infiniteline Global is involved in modern
                              technology business, which is closely linked with
                              the development of new cryptomining algorithms,
                              construction of powerful mining farms and trading
                              activity on electronic exchanges.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End Panel Default */}
                      {/* Panel Default */}
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="check-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#check2"
                            >
                              <span className="acc-icons"></span> Where Does The
                              Company Invest Raised Funds?
                            </a>
                          </h4>
                        </div>
                        <div id="check2" className="panel-collapse collapse">
                          <div className="panel-body">
                            <p>
                              Infiniteline Global is funding the construction of
                              new powerful mining farms and also engaged in
                              application development of new cryptomining
                              algorithms.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End Panel Default */}
                      {/* Panel Default */}
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="check-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#check3"
                            >
                              <span className="acc-icons"></span> When Will
                              Funds Enter My Wallet After Withdrawal Request?
                            </a>
                          </h4>
                        </div>
                        <div id="check3" className="panel-collapse collapse ">
                          <div className="panel-body">
                            <p>
                              It reflects on your wallet instantly as our
                              withdrawals are processed automatically.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End Panel Default */}
                      {/* Panel Default */}
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="check-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#check4"
                            >
                              <span className="acc-icons"></span> Minimum Amount
                              I Can Withdraw
                            </a>
                          </h4>
                        </div>
                        <div id="check4" className="panel-collapse collapse ">
                          <div className="panel-body">
                            <p>
                              Minimum withdrawal depends on the active plan.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End Panel Default */}
                      {/* Panel Default */}
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="check-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#check5"
                            >
                              <span className="acc-icons"></span> When Will The
                              First Profit Be Generated?
                            </a>
                          </h4>
                        </div>
                        <div id="check5" className="panel-collapse collapse">
                          <div className="panel-body">
                            <p>
                              Profit is generated according to investment plan
                              duration.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End Panel Default */}
                      {/* Panel Default */}
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="check-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#check6"
                            >
                              <span className="acc-icons"></span> Can I Open
                              Several Accounts In Your Program?
                            </a>
                          </h4>
                        </div>
                        <div id="check6" className="panel-collapse collapse">
                          <div className="panel-body">
                            <p>
                              Yes, but the details would have to be different
                              because accounts with the same details will result
                              in permanent blocking of the accounts & the funds
                              deposited in the accounts will be frozen.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End Panel Default */}
                    </div>
                  </div>
                  {/* End FAQ */}
                </div>
              </div>
            </div>
            {/* End Column */}
            <div className="col-md-5 col-sm-6 col-xs-12">
              <div className="faq-content">
                <h4>Have a any qustion?</h4>
                <div className="faq-quote">
                  <div className="row">
                    <form ref={form} onSubmit={sendMail}>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          required
                          data-error="Please enter your name"
                        />
                        <div className="help-block with-errors"></div>
                        <input
                          type="email"
                          className="email form-control"
                          id="email"
                          name="user_email"
                          placeholder="Email"
                          required
                          data-error="Please enter your email"
                        />
                        <div className="help-block with-errors"></div>
                        <input
                          type="text"
                          id="msg_subject"
                          name="msg_subject"
                          className="form-control"
                          placeholder="Subject"
                          required=""
                          data-error="Please enter your message subject"
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <textarea
                          id="message"
                          rows="7"
                          placeholder="Massage"
                          className="form-control"
                          required
                          name="message"
                          data-error="Write your message"
                        ></textarea>
                        <div className="help-block with-errors"></div>
                        <button type="submit" id="submit" className="quote-btn">
                          {send}
                        </button>
                        <div
                          id="msgSubmit"
                          className="h3 text-center hidden"
                        ></div>
                        <div className="clearfix"></div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* End Column */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
