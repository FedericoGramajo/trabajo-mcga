import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {
  email: undefined,
  password: undefined,
  logged: false,
  message: undefined,
  isLogging: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_EMAIL':
      return {
        ...state,
        email: action.payload,
        logged: false,
        message: undefined,
      }
    case 'ON_CHANGE_PASSWORD':
      return {
        ...state,
        password: action.payload,
        logged: false,
        message: undefined
      }
    case 'LOGIN_PENDING':
      return {
        ...state,
        isLogging: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isloging: false,
        logged: action.payload.success,
        message: action.payload.message,
      }
      case 'LOGIN_ERROR':
        return {
          ...state,
          isloging: false,
          message: action.payload.message,

        }

    default:
      return state
  }
}

export const onChangeEmail = (event) => {
  const text = event.target.value
  return {
    type: 'ON_CHANGE_EMAIL',
    payload: text
  }
}

export const onChangePassword = (event) => {
  const text = event.target.value
  return {
    type: 'ON_CHANGE_PASSWORD',
    payload: text
  }
}

export const handleLogin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_PENDING',
    })

    const options = {
      baseURL: 'https://login-mcga-gramajo.herokuapp.com/',
      timeout: 25000,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    return fetch(`https://login-mcga-gramajo.herokuapp.com/login`, { ...options, body: JSON.stringify({ email, password }) })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          return Promise.reject(data)
        }
        return dispatch({
          type: 'LOGIN_SUCCESS',
          payload: data,
        })
      })
      .catch(error => {
        return dispatch({
          type: 'LOGIN_ERROR',
          payload: error,
        })
      })
  }

}

const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store



/*export const handleLogin = () => ({
export const onChangePassword = (event) => {
const text = event.target.value
return {
type: 'ON_CHANGE_PASSWORD',
payload: text
}
}
type: 'HANDLE_LOGIN',
export const handleLogin = (email, password) => {
return (dispatch) =>{
dispatch({
type: "LOGIN_PENDING"
})
fetch("http://localhost:4000/login",{
baseURL: "localhost:4000",
timeout: 250000,
method: "POST",
headers: {
"Content-Type": "application/json"
},
body : JSON.stringify({
email: email,
password: password
})
})
.then(a => a.json())
.then((data) =>{
if(!data.success){
return dispatch({
type: "LOGIN_ERROR",
payload: data,
})
}
dispatch({
type: "LOGIN_SUCCESS",
payload: data,
})
})
.catch((error) =>{
dispatch({
type: "LOGIN_ERROR",
payload: data,
})
})
}

const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(
applyMiddleware(...middleware),
));

export default store
})*/
