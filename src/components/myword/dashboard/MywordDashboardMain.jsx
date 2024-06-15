import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import MywordSimplePaper from "../MywordSimplePaper.jsx";

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


export default function MywordDashboardMain({loginSessionInfo = null}) {


    const [mywordList, setMywordList] = useState([]);

    if (!loginSessionInfo) {
        alert("로그인된 사용자만 이용가능한 서비스입니다");
        location.href = FRONT_URL.login;
    }

    function getMywordList() {
        console.log("getMywordList 호출 시작!!!!");
        axios.get(
            serverUrl.word.myword.getMywordList,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response)
            setMywordList(response.data);
        }).catch((reason) => {
            console.log(reason)
            alert("알수없는 문제 발생")
        })


        // setNotepadList(getMockNotepadResponseList())
        console.log(mywordList);
    }


    useEffect(() => {
        getMywordList()
    }, []);

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '90vh',
                overflow: 'auto',
                // width: `${windowWidth}px`,
                width: '90vw',
                display: 'flex',          // Ensure the Box uses flex display
                flexDirection: 'column',  // Arrange children in a column
                // height: '100vh',          // Full viewport height
                // overflow: 'auto',
            }}
        >
            <Toolbar
            />

            <Container
                // maxWidth="lg"
                // maxWidth={false}
                fixed
                sx={{
                    mt: 4,
                    mb: 4,
                    // flexGrow: 1,             // Make the Container take up remaining space
                    // display: 'flex',         // Ensure the Container uses flex display
                    // flexDirection: 'column', // Arrange children in a column

                }}>

                <Grid
                    container
                    spacing={3}
                    sx={{
                        flexGrow: 1
                    }}
                    // fullwidth
                >
                    {mywordList.map((myword) => (
                        <Grid item xs={12} md={4} lg={3} key={myword.mywordName}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                    overflow: 'auto',
                                }}
                            >
                                <MywordSimplePaper myword={myword}/>
                            </Paper>
                        </Grid>
                    ))}


                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}