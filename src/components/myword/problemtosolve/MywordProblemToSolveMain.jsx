import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import {Copyright} from "@mui/icons-material";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import {useParams} from "react-router-dom";
import {AppBar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MywordProblemToSolvePaper from "../MywordProblemToSolvePaper.jsx";


export default function MywordProblemToSolveMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);

    if (!loginSessionInfo) {
        alert("로그인된 사용자만 이용가능한 서비스입니다");
        location.href = FRONT_URL.login;
    }


    const {mywordNameParam} = useParams();

    const [wordDocumentToSolve, setWordDocumentToSolve] = useState(null)

    useEffect(() => {
        axios.get(
            serverUrl.word.problemOfWord.getRandomWordDocumentToSolve(mywordNameParam),
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response);
            setWordDocumentToSolve(response.data);
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
                    <Button
                        color="inherit"
                        // href={FRONT_URL.myword.problemToSolve(mywordNameParam)}
                        // 현재페이지 다시로드하면.. 서버에서 random 돌려서.. 단어장에서 하나 가져옴...
                        onClick={() => window.location.reload()}
                    >다른문제 가져오기</Button>
                </Toolbar>
            </AppBar>


            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>

                    {wordDocumentToSolve && (

                            <Grid
                                item
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
                                    <MywordProblemToSolvePaper wordDocument={wordDocumentToSolve}/>
                                </Paper>
                            </Grid>
                        )
                    }

                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}