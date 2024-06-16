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
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import NotepadWrite from './pages/notepad/NotepadWrite.jsx'

// react cookie
import {CookiesProvider} from "react-cookie";
import ForgotLogin from "./pages/forgot-login/ForgotLogin.jsx";
import ButtonGroupContainedWhenClickDemo from "./pages/demo/buttongroup-demo/ButtonGroupContainedWhenClickDemo.jsx";
import FRONT_URL from "./assets/enum/frontUrl.js";
import NotepadList from "./pages/notepad/NotepadList.jsx";
import NotepadDetail from "./pages/notepad/NotepadDetail.jsx";
import NotepadUpdatePage from "./pages/notepad/NotepadUpdatePage.jsx";
import MyPageInfoPage from "./pages/mypage/MyPageInfoPage.jsx";
import MyPageUpdatePage from "./pages/mypage/MyPageUpdatePage.jsx";
import MyPageChangePasswordPage from "./pages/mypage/MyPageChangePasswordPage.jsx";
import MyPageDeleteAccountPage from "./pages/mypage/MyPageDeleteAccountPage.jsx";
import SearchDashboardPage from "./pages/search/SearchDashboardPage.jsx";
import naverOauth from "./assets/enum/oauth/naverOauth.js";
import SearchWordResultPage from "./pages/search/SearchWordResultPage.jsx";
import NaverOauthCallbackPage from "./pages/login/naver/NaverOauthCallbackPage.jsx";
import FullCalendarDemo from "./pages/demo/fullcalendar-demo/FullCalendarDemo.jsx";
import CalendarPage from "./pages/calendar/CalendarPage.jsx";
import SearchWordResultDetailPage from "./pages/search/SeatchWordResultDetailPage.jsx";
import AddWordNameToMywordModal from "./components/search/AddWordNameToMywordModal.jsx";
import MywordDashboardPage from "./pages/myword/MywordDashboardPage.jsx";
import MywordDetailPage from "./pages/myword/MywordDetailPage.jsx";
import MywordProblemToSolvePage from "./pages/myword/MywordProblemToSolvePage.jsx";

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

    // 로그인
    {
        path: FRONT_URL.login,
        //'/login',
        element: <Login/>
    },
    // 회원가입
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
    //     element: <DashboardPage/>,
    // },
    {
        path: FRONT_URL.dashboard,
        // '/dashboard',
        element: <DashboardPage/>,
    },

    // 공부메모장
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
    },

    // 마이페이지
    {
        path: FRONT_URL.mypage.info,
        element: <MyPageInfoPage />
    },
    {
        path: FRONT_URL.mypage.update,
        element: <MyPageUpdatePage />
    },
    {
        path: FRONT_URL.mypage.delete,
        element: <MyPageDeleteAccountPage />
    },
    {
        path: FRONT_URL.mypage.changePassword,
        element: <MyPageChangePasswordPage />
    },

    // 단어검색
    {
        path: FRONT_URL.searchWord.dashboard,
        element: <SearchDashboardPage />
    },
    {
        path: FRONT_URL.searchWord.result(":wordNameParam"),
        element: <SearchWordResultPage />
    },
    {
        path: FRONT_URL.demo.AddWordNameToMywordModal,
        element: <AddWordNameToMywordModal />
    },
    {
        path: FRONT_URL.searchWord.detail(":wordNameParam"),
        element: <SearchWordResultDetailPage />
    },
    // 네이버 로그인 callback 처리
    {
        path: naverOauth.callback_URI,
        element: <NaverOauthCallbackPage />
    },
    // fullcalendar demo
    {
        path: FRONT_URL.calendar.demo,
        element: <FullCalendarDemo />
    },
    // fullcalendar
    {
        path: FRONT_URL.calendar.main,
        element: <CalendarPage />
    },

    // 단어장
    {
        path: FRONT_URL.myword.dashboard,
        element: <MywordDashboardPage />
    },
    {
        path: FRONT_URL.myword.detail(":mywordNameParam"),
        element: <MywordDetailPage />
    },

    // 단어장 단어들로 문제 풀기
    {
        path: FRONT_URL.myword.problemToSolve(":mywordNameParam"),
        element: <MywordProblemToSolvePage />
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CookiesProvider>

            <RouterProvider router={router}/>
            {/*<App />*/}
        </CookiesProvider>
    </React.StrictMode>,
)
