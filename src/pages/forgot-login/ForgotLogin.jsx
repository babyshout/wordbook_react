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
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";


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
                <SelectWhichButton />

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

function SelectWhichButton() {

    const buttons = [
        <Button key="one">One</Button>,
        <Button key="two">Two</Button>,
        <Button key="three">Three</Button>,
    ];
        const [selectedButton, setSelectedButton] = React.useState('one');
                return (

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup size="large" aria-label="Large button group">
                    <Button
                        key="one"
                        id="one"
                        onClick={() => setSelectedButton('one')}
                        onClick={(event) => {
                            console.log(event);
                            setSelectedButton('one');
                        }}
                        variant={selectedButton === 'one' ? 'contained' : 'outlined'}
                    >
                        One
                    </Button>
                    <Button
                        key="two"
                        id="two"
                        onClick={(event) => {
                            console.log(event);
                            setSelectedButton('two');
                        }}
                        variant={selectedButton === 'two' ? 'contained' : 'outlined'}
                    >
                        Two
                    </Button>
                    <Button
                        key="three"
                        id="three"
                        onClick={(event) => {
                            console.log(event);
                            setSelectedButton('three');
                        }}
                        variant={selectedButton === 'three' ? 'contained' : 'outlined'}
                    >
                        Three
                    </Button>
                </ButtonGroup>
            </Box>



)
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
                <Link href="/login" variant="body2">
                    로그인 하러가기
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