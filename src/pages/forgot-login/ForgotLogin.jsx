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
import ForgotId from "./ForgotId.jsx";
import ForgotPassword from "./ForgotPassword.jsx";


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
                <SelectWhichButton isForgotId={isForgotId} setIsForgotId={setIsForgotId}/>

                {isForgotId ? (<TypographyAndAvatar
                    label={'아이디 찾기'}
                />):(
                    <TypographyAndAvatar
                    label={'비밀번호 재설정'}
            />)}
                {/*login Form box start*/}
                <Box
                    sx={{mt: 1}}
                >
                    {/*TODO ForgotId 컴포넌트로 TypographyAndAvatar 넣기!!!*/}
                    {isForgotId ? (
                        <>
                            <ForgotId/>
                        </>
                    ) : (
                        <>
                            <ForgotPassword/>
                        </>
                    )}

                    {/*TODO ForgotId 컴포넌트로 LinkBelow 넣기!!!*/}
                    <LinkBelow/>

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

function SelectWhichButton({isForgotId, setIsForgotId}) {

    const buttons = [
        <Button key="one">One</Button>,
        <Button key="two">Two</Button>,
        <Button key="three">Three</Button>,
    ];
    // const [selectedButton, setSelectedButton] = React.useState('one');
    return (

        // <Box
        //     sx={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         '& > *': {
        //             m: 1,
        //         },
        //     }}
        // >
        <ButtonGroup
            fullWidth
            size="large"
            aria-label="Large button group">
            <Button
                key="forgot-id"
                id="forgot-id"
                onClick={(event) => {
                    console.log("아이디찾기 버튼 클릭!")
                    console.log(event);
                    setIsForgotId(true);
                }}
                variant={isForgotId ? 'contained' : 'outlined'}
            >
                아이디 찾기
            </Button>
            <Button
                key="forgot-password"
                id="forgot-password"
                onClick={(event) => {
                    console.log("비밀번호 재설정 버튼 클릭!")
                    console.log(event);
                    setIsForgotId(false);
                }}
                variant={!isForgotId ? 'contained' : 'outlined'}
            >
                비밀번호 재설정
            </Button>
        </ButtonGroup>
        // </Box>


    )
}

function TypographyAndAvatar({label}) {
    return (
        <>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {label}
            </Typography>
        </>
    )
}

function LinkBelow() {
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