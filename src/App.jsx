import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import {useCookies} from "react-cookie";
import Button from "@mui/material/Button";
import COOKIES from "./assets/enum/cookies.js";
import Link from "@mui/material/Link";
import * as React from "react";




function App() {
  const [count, setCount] = useState(0)
   const [cookie, setCookie, removeCookie] = useCookies()
  //   console.log(cookie);
  // console.log(Object.entries(cookie))

  return (
    <>
        {/*<SignUp />*/}
        <h4>{Object.entries(cookie).map(value => {
            console.log(value)
            return JSON.stringify(value[1], "\n",  2)
        })}</h4>
        {
            cookie[COOKIES.loginInfo.name] ? (

        <Button type={"button"}
                onClick={(event) => {
                    removeCookie(COOKIES.loginInfo.name)
                }}
                >
            logout
        </Button>
            ) : (
                <Link href="/login" variant="body2">
                    로그인
                </Link>
            )
        }
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
