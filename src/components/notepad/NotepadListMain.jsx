import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "/src/components/dashboard/Chart.jsx";
import Deposits from "/src/components/dashboard/Deposits.jsx";
import Orders from "/src/components/dashboard/Orders.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {useEffect, useState} from "react";
import Notepad from "./Notepad.jsx";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";

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

// let notepadResponse = {
//     notepadSeq: 1,
//     content: "",
//     regDate: null,
//     chgDate: null,
// }

function getMockNotepadResponseList() {
    let notepadResponseList = [];

    for (let i = 0; i < 10; i++) {
        const notepadResponse = {
            notepadSeq: i,
            content: "notepad 컨텐츠!! " + Math.random(),
            regDate: new Date(),
            chgDate: new Date(),
        }
        notepadResponseList.push(notepadResponse);
    }

    return notepadResponseList;
}


/*
TODO notepadReseponse 가지고 mock 데이터 만들어서 레이아웃 확인하기
 */
export default function NotepadListMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);

    const [notepadList, setNotepadList] = useState([]);

    if (!loginSessionInfo) {
        alert("로그인된 사용자만 이용가능한 서비스입니다");
        // location.href = FRONT_URL.login;
    }

    function getNotepadList() {
        console.log("getNotepadList 호출 시작!!!!");
        axios.get(
            serverUrl.notepad.getNotepadList,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response)
        }).catch((reason) => {
            console.log(reason)
        })


        setNotepadList(getMockNotepadResponseList())
        console.log(notepadList);
    }


    // getNotepadList();

    useEffect(() => {
        getNotepadList()
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
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>

                    {/* Recent Deposits */}
                    {notepadList.map((notepad) => (
                        <Grid item xs={12} md={4} lg={3} key={notepad.notepadSeq}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                {/*<Deposits/>*/}
                                <Notepad notepadResponse={notepad}/>
                            </Paper>
                        </Grid>
                    ))}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            {/*<Deposits/>*/}
                            <Notepad/>
                        </Paper>
                    </Grid>

                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}