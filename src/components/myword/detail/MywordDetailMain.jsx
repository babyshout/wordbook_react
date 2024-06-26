import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import {Copyright} from "@mui/icons-material";
import MywordDetailPaper from "../MywordDetailPaper.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import {useParams} from "react-router-dom";
import {AppBar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default function MywordDetailMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);

    if (!loginSessionInfo) {
        alert("로그인된 사용자만 이용가능한 서비스입니다");
        location.href = FRONT_URL.login;
    }


    const {mywordNameParam} = useParams();

    const [wordDocumentList, setWordDocumentList] = useState([])

    useEffect(() => {
        axios.get(
            serverUrl.word.myword.getMywordDetail(mywordNameParam),
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response);
            setWordDocumentList(response.data.wordDocumentList);
        }).catch(reason => {
            console.warn(reason);
        })
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
            <AppBar
                // position="fixed"
                // position="absolute"
                position="sticky"
                // position="static"
                // position="relative"

            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        메뉴
                    </Typography>
                    {/*<Button*/}
                    {/*    color="inherit"*/}
                    {/*    href={FRONT_URL.notepad.list}*/}
                    {/*>공부메모장 리스트로 돌아가기</Button>*/}
                    <Button
                        color="inherit"
                        href={FRONT_URL.myword.problemToSolve(mywordNameParam)}
                    >단어 연습하기</Button>
                </Toolbar>
            </AppBar>


            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>

                    {wordDocumentList.map((wordDocument, index) => {
                        return (

                            <Grid
                                item
                                key={index}
                            >
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "70vh",
                                        width: "80vw",
                                        // height: 'inherit',
                                        // width: 'inherit',
                                        overflow: 'auto',
                                    }}
                                >
                                    <MywordDetailPaper wordDocument={wordDocument}/>
                                </Paper>
                            </Grid>
                        )
                    })}

                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}