import React, { useEffect, useState } from 'react'
import InvestmentCard from '../card/InvestmentCard'
import { emptyCart, getCart } from './cartHelpers'
import Header from '../navs/header/Header'
import Footer from '../navs/footer/Footer'
import Checkout from '../checkout/Checkout'

const Cart = ({ history }) => {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)

  useEffect(() => {
    setItems(getCart())
  }, [run])

  const cancel = () => {
    emptyCart(() => {
      setRun(!run) // run useEffect in parent Cart
      history.push('/investment')
    })
  }

  const showItems = (items) => {
    return (
      <>
        {items.map((investmentpackage, ip) => (
          <InvestmentCard
            key={ip}
            investmentpackage={investmentpackage}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveInvestmentPackageButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </>
    )
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
                  <h2 style={{ color: '#fff' }}>Payment</h2>
                </div>
                <ul>
                  <li class="home-bread">Home</li>
                  <li>Payment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{marginTop: "50px"}}>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            {items.length > 0 ? showItems(items) : null}
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <Checkout investmentpackages={items} setRun={setRun} run={run} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
