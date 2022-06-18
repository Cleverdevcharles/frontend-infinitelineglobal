import React from 'react'
import 'react-phone-number-input/style.css'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './components/cart/Cart'
import ManageInvestmentPackages from './dashboard/admin/investmentpackage/ManageInvestmentPackages'
import UpdateInvestmentPackage from './dashboard/admin/investmentpackage/UpdateInvestmentPackage'
import History from './dashboard/admin/orderHistory'
import Orders from './dashboard/admin/Orders'
import Create__Site from './dashboard/admin/site/Create__Site'
import Manage__Sites from './dashboard/admin/site/Manage__Site'
import UpdateSite from './dashboard/admin/site/Update__Site'
import UpdateAdminInfo from './dashboard/admin/UpdateAdminInfo'
import UpdatePaymentOption from './dashboard/admin/UpdatePaymentOption'
import UpdateUserInfo from './dashboard/subscriber/UpdateUserInfo'
import AdminRoute from './Routes/AdminRoute'

// Pages
const Home = React.lazy(() => import('./components/home/Home'))
const Login = React.lazy(() => import('./components/auth/login/Login'))
const Register = React.lazy(() => import('./components/auth/register/Register'))
const Activate = React.lazy(() => import('./components/auth/activate/Activate'))
const ForgetPassword = React.lazy(() =>
  import('./components/auth/forgotPassword/ForgetPassword'),
)
const ResetPassword = React.lazy(() =>
  import('./components/auth/resetPassword/ResetPassword'),
)
const About_Us = React.lazy(() => import('./components/navs/about/About_Us'))
const Investment = React.lazy(() =>
  import('./components/navs/investment/Investment'),
)
const Contact_Us = React.lazy(() =>
  import('./components/navs/contact/Contact_Us'),
)
const TermsConditions = React.lazy(() =>
  import('./components/navs/terms_conditions/TermsConditions'),
)
const Review = React.lazy(() => import('./components/navs/hero/Review'))
const Admin = React.lazy(() => import('./dashboard/admin/Admin'))

const CreateInvestmentPackage = React.lazy(() =>
  import('./dashboard/admin/investmentpackage/CreateInvestmentPackage'),
)
const AdminInfo = React.lazy(() => import('./dashboard/admin/AdminInfo'))
const Subscriber = React.lazy(() => import('./dashboard/subscriber/Subscriber'))
const UserInfo = React.lazy(() => import('./dashboard/subscriber/UserInfo'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const App = () => {
  return (
    <React.Suspense fallback={loading}>
      <span style={{ fontSize: '20px' }}>
        <ToastContainer />
      </span>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user-account-verify-:token" component={Activate} />
        <Route exact path="/users-password-forget" component={ForgetPassword} />
        <Route
          exact
          path="/users-password-reset-:token"
          component={ResetPassword}
        />
        <Route exact path="/about" component={About_Us} />
        <Route exact path="/contact" component={Contact_Us} />
        <Route exact path="/investment" component={Investment} />
        <Route exact path="/reviews" component={Review} />
        <Route exact path="/terms-conditions" component={TermsConditions} />
        <AdminRoute exact path="/admin-dashboard" component={Admin} />
        <Route exact path="/dashboard" component={Subscriber} />
        <Route exact path="/dashboard-user-info" component={UserInfo} />
        <AdminRoute
          exact
          path="/admin-create-new-investment-package"
          component={CreateInvestmentPackage}
        />
        <AdminRoute
          exact
          path="/admin-investment-packages"
          component={ManageInvestmentPackages}
        />
        <AdminRoute
          exact
          path="/admin-update-investment-package-:investmentpackageId"
          component={UpdateInvestmentPackage}
        />
        <Route
          exact
          path="/investment-package-:investmentpackageId"
          component={Cart}
        />
        <Route path="/investment-history" exact component={History} />
        <AdminRoute path="/admin-investment-orders" exact component={Orders} />
        <AdminRoute
          exact
          path="/admin-dashboard-user-info"
          component={AdminInfo}
        />
        <AdminRoute
          exact
          path="/admin-dashboard-update-info-:userId"
          component={UpdateAdminInfo}
        />
        <Route
          exact
          path="/dashboard-update-payment-info-:userId"
          component={UpdatePaymentOption}
        />
        <Route
          exact
          path="/dashboard-update-info-:userId"
          component={UpdateUserInfo}
        />
        <AdminRoute
          exact
          path="/admin-create-site-details"
          component={Create__Site}
        />
        <AdminRoute
          exact
          path="/admin-site-details"
          component={Manage__Sites}
        />
        <AdminRoute
          exact
          path="/admin-site-update-:siteId"
          component={UpdateSite}
        />
      </Switch>
    </React.Suspense>
  )
}

export default App
