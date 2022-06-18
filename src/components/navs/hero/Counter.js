import React from "react";

const Counter = () => {
  return (
    <div class="counter-area fix area-padding-2">
    <div class="container">
        {/* Start counter Area */}
         <div class="row">
            <div class="fun-content">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    {/* fun_text  */}
                    <div class="fun_text">
                        <span class="counter-icon"><i class="flaticon-035-savings"></i></span>
                        <span class="counter">$5974544</span>
                        <h4>Total Deposited</h4>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                    {/* fun_text  */}
                    <div class="fun_text">
                       <span class="counter-icon"><i class="flaticon-034-reward"></i></span>
                        <span class="counter">2209</span>
                        <h4>Total Members</h4>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                    {/* fun_text  */}
                    <div class="fun_text">
                       <span class="counter-icon"><i class="flaticon-016-graph"></i></span>
                        <span class="counter">$3974544</span>
                        <h4>Total Payments</h4>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                    {/* fun_text  */}
                    <div class="fun_text">
                      <span class="counter-icon"><i class="flaticon-043-world"></i></span>
                        <span class="counter">80</span>
                        <h4>World Country</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Counter;
