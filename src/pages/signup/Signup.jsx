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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignupForm from "./SignupForm.jsx";

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
 * @link https://github.com/mui/material-ui/tree/v5.15.15/docs/data/material/getting-started/templates/sign-up
 * @returns {Element}
 * @constructor
 */
export default function Signup() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        // <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                    <SignupForm
                        // onSubmit={handleSubmit}
                    />

                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        // </ThemeProvider>
    );
}

function TypographyAndAvatar() {
    return (
        <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
    <Typography component="h1" variant="h5">
        Sign up
    </Typography>
        </>
    )
}