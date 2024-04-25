import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

/**
 * Roboto font
 * {@link https://mui.com/material-ui/getting-started/installation/#roboto-font}
 * Material UI uses the Roboto font by default. Add it to your project via Fontsource, or with the Google Fonts CDN.
 */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Login from './pages/login/Login.jsx'
import Signup from "./pages/signup/Signup.jsx";
import ErrorPage from "./pages/error-page/error-page.jsx";
import {CookiesProvider} from "react-cookie";

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello World!</div>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/default-app',
        element: <App/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CookiesProvider>

            <RouterProvider router={router}/>
            {/*<App />*/}
        </CookiesProvider>
    </React.StrictMode>,
)
