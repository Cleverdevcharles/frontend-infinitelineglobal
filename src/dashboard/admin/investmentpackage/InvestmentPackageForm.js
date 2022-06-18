import React from "react";

const CategoryForm = ({
  handleSubmit,
  name,
  duration,
  minimum_amount,
  maximum_amount,
  percentage_interest,
  setName,
  setDuration,
  setMinimumAmount,
  setMaximumAmount,
  setPercentageInterest,
  loading,
}) => {
  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
                 <div class="login-area area-padding fix">
            <div class="login-overlay"></div>
            <div class="table">
                <div class="table-cell">
                    <div class="container">
                        <div class="row justify-content-center text-center ml-5">
                            <div class="col-xl-9 col-lg-9 col-md-6">
                                <div class="login-form signup-form">
                                    <h4 class="login-title text-center">Update Investment Plan</h4>
                                    <div class="row">
                                        <form id="contactForm"  class="log-form" onSubmit={handleSubmit}>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input
                                              type="text"
                                              className="form-control text-dark"
                                              placeholder="Please enter your investment package name"
                                              onChange={(e) => setName(e.target.value)}
                                              value={name}
                                              name="name"
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input
                                              type="text"
                                              className="form-control text-dark"
                                              placeholder="Please enter your investment package minimum amount."
                                              onChange={(e) => setMinimumAmount(e.target.value)}                                              value={minimum_amount}
                                              name="minimum_amount"
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input
                                              type="text"
                                              className="form-control text-dark"
                                              placeholder="Please enter your investment package maximum amount."
                                              onChange={(e) => setMaximumAmount(e.target.value)}                                              name="maximum_amount"
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input
                                              type="text"
                                              className="form-control text-dark"
                                              placeholder="Please enter your investment percentage initerest"
                                              onChange={(e) => setPercentageInterest(e.target.value)}                                              value={percentage_interest}
                                              name="percentage_interest"
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <select
                                              className="col-md-6 form-control text-dark"
                                              onChange={(e) => setDuration(e.target.value)}                                              name="duration"
                                            >
                                              <option selected style={{ color: "gray" }}>
                                                Select Duration
                                              </option>
                                              <option value="7" style={{ color: "gray" }}>
                                                Weekly
                                              </option>
                                              <option value="30" style={{ color: "gray" }}>
                                                Monthly
                                              </option>
                                            </select>
                                            </div>
                                            
                                          
                                            <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                            <button type="submit" id="submit" className="slide-btn login-btn">
                                            {loading ? (
                                              <div className="spinner" id="spinner">
                                                Loading...
                                              </div>
                                            ) : (
                                              <b>Update</b>
                                            )}
                                            </button>
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
              </div>
  );
};

export default CategoryForm;
