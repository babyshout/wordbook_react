import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * Roboto font
 * {@link https://mui.com/material-ui/getting-started/installation/#roboto-font}
 * Material UI uses the Roboto font by default. Add it to your project via Fontsource, or with the Google Fonts CDN.
 */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


/**
 * settings for react-router
 */
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Login from './pages/login/Login.jsx';
import Signup from "./pages/signup/Signup.jsx";
import ErrorPage from "./pages/error-page/error-page.jsx";
import App from './App.jsx';
import Dashboard from './pages/demo/dashboard/Dashboard.jsx';

// react cookie
import {CookiesProvider} from "react-cookie";
import ForgotLogin from "./pages/forgot-login/ForgotLogin.jsx";
import ButtonGroupContainedWhenClickDemo from "./pages/demo/buttongroup-demo/ButtonGroupContainedWhenClickDemo.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/hello-world',
        element: <h1>HELLO WORLD!!!!</h1>
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
    },
    {
        path: '/forgot-login',
        element: <ForgotLogin/>,
    },
    {
        path: '/demo/button-group-click-demo',
        element: <ButtonGroupContainedWhenClickDemo/>,
    },
    {
        path: '/demo/dashboard',
        element: <Dashboard/>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CookiesProvider>

            <RouterProvider router={router}/>
            {/*<App />*/}
        </CookiesProvider>
    </React.StrictMode>,
)
