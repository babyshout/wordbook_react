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
import Dashboard from './pages/dashboard/Dashboard.jsx';
import NotepadWrite from './pages/notepad/NotepadWrite.jsx'

// react cookie
import {CookiesProvider} from "react-cookie";
import ForgotLogin from "./pages/forgot-login/ForgotLogin.jsx";
import ButtonGroupContainedWhenClickDemo from "./pages/demo/buttongroup-demo/ButtonGroupContainedWhenClickDemo.jsx";
import FRONT_URL from "./assets/enum/frontUrl.js";
import NotepadList from "./pages/notepad/NotepadList.jsx";
import NotepadDetail from "./pages/notepad/NotepadDetail.jsx";
import NotepadUpdatePage from "./pages/notepad/NotepadUpdatePage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: FRONT_URL.hello_world,
        //'/hello-world',
        element: <h1>HELLO WORLD!!!!</h1>
    },
    {
        path: FRONT_URL.login,
        //'/login',
        element: <Login/>
    },
    {
        path: FRONT_URL.signup,
        //'/signup',
        element: <Signup/>
    },
    {
        path: FRONT_URL.default_app,
        // '/default-app',
        element: <App/>
    },
    {
        path: FRONT_URL.forgot_login,
        // '/forgot-login',
        element: <ForgotLogin/>,
    },
    {
        path: FRONT_URL.demo.button_group_click,
        // '/demo/button-group-click-demo',
        element: <ButtonGroupContainedWhenClickDemo/>,
    },
    // {
    //     path: '/demo/dashboard-demo',
    //     element: <Dashboard/>,
    // },
    {
        path: FRONT_URL.dashboard,
        // '/dashboard',
        element: <Dashboard/>,
    },
    {
        path: FRONT_URL.notepad.list,
        // '/dashboard',
        element: <NotepadList/>,
    },
    {
        path: FRONT_URL.notepad.write,
        element: <NotepadWrite/>
    },
    {
        path: FRONT_URL.notepad.detail(':notepadSeq'),
        element: <NotepadDetail />
    },
    {
        path: FRONT_URL.notepad.update(':notepadSeq'),
        element: <NotepadUpdatePage />
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
