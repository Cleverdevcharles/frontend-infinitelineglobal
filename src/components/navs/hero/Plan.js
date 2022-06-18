import React, { useEffect, useState } from 'react'
import { getInvestmentPackages } from '../../../functions/investmentpackage'
import InvestmentCard from '../../card/InvestmentCard'

const Plan = ({match}) => {
  const [data, setData] = useState({
    categories: [],
    category: '',
  })

  const { categories, category } = data
 
  const loadInvestmentPackages = () => {
    getInvestmentPackages().then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setData({ ...data, categories: data })
      }
    })
  }

  useEffect(() => {
    loadInvestmentPackages()
  }, [])

  return (
    <div className="invest-area bg-color area-padding-2">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="section-headline text-center">
              <h3>The Best Investment Plan</h3>
              <p>
              Investing Strategy for development of global business relations.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="pricing-content">
            {categories &&
              categories.map((investmentpackage, ip) => (
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <InvestmentCard investmentpackage={investmentpackage} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plan
