import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../../../functions/auth'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import emailjs from '@emailjs/browser'

function Contact_Us() {
  const { user } = isAuthenticated()
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
      <div class="page-area">
        <div class="breadcumb-overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="breadcrumb text-center">
                <div class="section-headline">
                  <h2 style={{ color: '#fff' }}>Contact Us</h2>
                </div>
                <ul>
                  <li class="home-bread">Home</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-page bg-color area-padding">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="contact-left">
                <div class="contact-image">
                  <img src="img/about/ab.jpg" alt="" />
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="contact-form">
                <form
                  id="contactForm"
                  ref={form}
                  onSubmit={sendMail}
                  class="contact-form"
                >
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        class="form-control text-white"
                        placeholder="Name"
                        required
                        data-error="Please enter your name"
                      />
                      <div class="help-block with-errors"></div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <input
                        type="email"
                        class="email form-control text-white"
                        id="email"
                        name="user_email"
                        placeholder="Email"
                        required
                        data-error="Please enter your email"
                      />
                      <div class="help-block with-errors"></div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <input
                        type="text"
                        id="msg_subject"
                        name="msg_subject"
                        class="form-control text-white"
                        placeholder="Subject"
                        required
                        data-error="Please enter your message subject"
                      />
                      <div class="help-block with-errors"></div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <textarea
                        id="message"
                        rows="7"
                        name="message"
                        placeholder="Massage"
                        class="form-control text-white"
                        required
                        data-error="Write your message"
                      ></textarea>
                      <div class="help-block with-errors"></div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                      <button type="submit" id="submit" class="contact-btn">
                        {send}
                      </button>
                      <div id="msgSubmit" class="h3 text-center hidden"></div>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact_Us
