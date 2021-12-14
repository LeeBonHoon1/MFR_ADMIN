import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import Page from './Page';
import { AuthContext } from "./Context";


function App() {
  const [auth, setAuth] = useState({
    state: localStorage.getItem('auth') || null,
    // state: {},
    set: (_state) => {
      if(_state) {
        localStorage.setItem('auth', JSON.stringify(_state));
      } else {
        localStorage.removeItem('auth');
      }
      setAuth({...auth, state: _state})
    }
  });

  useEffect(() => {
    // console.log('auth :::', auth);
  }, [auth])

  return (
    <AuthContext.Provider value={auth}>
      <Page />
    </AuthContext.Provider>
  )
}

export default App;
