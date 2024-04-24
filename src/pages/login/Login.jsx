import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import LoginForm from "./LoginForm.jsx";

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

// const defaultTheme = createTheme();

/**
 *
 * @link https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/getting-started/templates/sign-in/SignIn.js
 * @returns {Element}
 * @constructor
 */
export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        // <ThemeProvider theme={defaultTheme}>
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

function TypographyAndAvatar(props) {
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
                    Forgot password?
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