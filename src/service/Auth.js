import axios from 'axios'
import { BASEURL, DOMAIN } from '../constant/appConstant'
const KEY_AUTH_USER = 'KEY_AUTH_USER'

export default function authHeader() {
  const headers = {
    'Content-Type': "application/json;charset=utf-8",
    'Access-Control-Allow-Origin': "*",
  }

  /**for testing prpose uncomment this... */
  /**
   * const headers = {
    'Content-Type': "application/json;charset=utf-8",
    'Access-Control-Allow-Origin': "*",
    'Custom-Header': "xxx",
    "Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDk3MjkyIiwiaXNzIjoiQk9TIiwicm9sZXMiOiJbUk9MRV9FTVBMT1lFRV0iLCJpYXQiOjE2Njk1NjUyODIsImV4cCI6MTY2OTY1MTY4Mn0.Z0fdxXHk-PTQkJz9Mc2ix_PflIg1IfY6e1dkJ5w8qVmduh16IqHuR-eWgIPKzxaabAlcSCju11Ytnd2sFVPKSA"
  }
  return headers;
   *
   */
  const userAuth = getAuth();
  if (userAuth && userAuth.accessToken) {
    return { ...headers, Authorization: 'Bearer ' + userAuth.accessToken };
  } else {
    return headers
  }
}

export const setAuth = (data) => {
  localStorage.setItem(KEY_AUTH_USER, data);
}

// always wrap in try catch block
export const getAuth = () => {
  const json = localStorage.getItem(KEY_AUTH_USER);

  let user = null
  try {
    user = JSON.parse(json)
  }
  catch (err) {
    console.log("Error while getting Auth : ", err);
  }
  return user
}

export const loginHandler = (username, password) => {
  return axios.post(DOMAIN + '/auth/login',
    {
      username: username,
      password: password,
    },
    { headers: authHeader() },
  )
}


export const hasAuthority = (role) => {
  const user = getAuth();
  return user?.user?.role?.includes(role);
}