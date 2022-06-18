import { BACKEND_API } from "../config";

export const reduceReferralEarnings = (user) => {
    return fetch(`${BACKEND_API}/reduce/referral/earnings`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json()
      })
      .catch((err) => {
        console.log(err)
      })
  }

export const updateWithdrawal = (user, token) => {
    return fetch(`${BACKEND_API}/update/withdrawal`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json()
      })
      .catch((err) => console.log(err))
  }
