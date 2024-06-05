import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from './component/menu/sidemenu/listItems.jsx';
import Chart from './Chart.jsx';
import Deposits from './Deposits.jsx';
import Orders from './Orders.jsx';
import Button from "@mui/material/Button";
import axios from "axios";
import {useEffect, useState} from "react";
import REQUEST_URL from "/src/assets/enum/serverUrl.js"
import SideMenu from "./component/menu/sidemenu/SideMenu.jsx";
import UpperAppBar from "./component/menu/appbar/UpperAppBar.jsx";
import useOpenState from "../notepad/hooks/useOpenState.js";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// NOTE Dashboard 컴포넌트 시작!!!
export default function Dashboard() {


    // useOpenState 생성..
    const [open, setOpen, toggleDrawer] = useOpenState();

    const [isLogin, setIsLogin] = useState(false)
    // login 정보 session 에서 가져옴
    useEffect(() => {
        axios.get(
            REQUEST_URL.student.loginSessionInformation,
            {
                headers: "Content-Type: application/json",
                withCredentials: true,
            }
        ).then(function (response) {
            console.log(response)
            if (response.data !== null) {
                setIsLogin(true)
            }
        }).catch(reason => {
            console.log(reason);
            setIsLogin(false)
        })
    }, [isLogin])

    // logout 버튼 핸들링!!!
    function handleLogoutButton(event) {
        console.log(event);
        axios.delete(REQUEST_URL.student.loginSessionInformation,
            {
                headers: "Content-Type: application/json",
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                setIsLogin(false);
            }, (reason) => {
                console.log(reason);
            })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                {/*맨위 AppBar 부분*/}
                <UpperAppBar
                    open={open}
                    toggleDrawer={toggleDrawer}
                    isLogin={isLogin}
                    handleLogoutButton={handleLogoutButton}
                />


                {/*NOTE 0604 SideMenu 컴포넌트 생성으로 기존 코드 삭제*/}
                {/*사이드 메뉴바!*/}
                <SideMenu toggleDrawer={toggleDrawer} open={open}/>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Chart/>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Deposits/>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Deposits/>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Deposits/>
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    <Orders/>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/*맨 아래 카피라이트 부분*/}
                        <Copyright sx={{pt: 4}}/>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
