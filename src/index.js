import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import App from './App'

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCebdq4MbGrJ5Mbwac-K6jPBzZKzRAkksc",
  authDomain: "zokirkhan1002.firebaseapp.com",
  projectId: "zokirkhan1002",
  storageBucket: "zokirkhan1002.appspot.com",
  messagingSenderId: "292439732091",
  appId: "1:292439732091:web:278e360c028229940197de",
  measurementId: "G-2L4VVEYHKN",
})

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore
    }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
)
