import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LoginForm from "../login/LoginForm.jsx";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import * as React from "react";
import {useState} from "react";


export default function ForgotLogin() {

    const [isForgotId, setIsForgotId] = useState(true);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TypographyAndAvatar
                />
                {/*login Form box start*/}
                <Box
                    sx={{mt: 1}}
                >

                    <LoginForm

                    />


                    <ForgotPassword
                    />
                </Box>
                {/*    login form box end*/}
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
        // </ThemeProvider>
    );
}

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

function TypographyAndAvatar() {
    return (
        <>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
        </>
    )
}

function ForgotPassword() {
    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <Link href="/forgot-passowrd" variant="body2">
                    Forgot id or password?
                </Link>
            </Grid>
            <Grid item>
                <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Grid>
    )
}