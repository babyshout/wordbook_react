import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import Notepad from "../Notepad.jsx";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import Button from "@mui/material/Button";
import {AppBar} from "@mui/material";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import {Copyright} from "@mui/icons-material";



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
            content: "notepad 컨텐츠!! "
                + ' ' +
                Math.random()
                + ' ' +
                Math.random()
                + ' ' +
                Math.random()
                + ' ' +
                Math.random()
                + ' ' +
                Math.random()
            ,
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
export default function NotepadWriteMain({loginSessionInfo = null}) {

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
            setNotepadList(response.data)
        }).catch((reason) => {
            console.log(reason)
            // setNotepadList(reason.response.data);
            console.log("notepadList 비어있음")
            // setNotepadList([]);
        })


        // setNotepadList(getMockNotepadResponseList())
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
                    {/*<IconButton*/}
                    {/*    size="large"*/}
                    {/*    edge="start"*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="menu"*/}
                    {/*    sx={{ mr: 2 }}*/}
                    {/*>*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        메뉴
                    </Typography>
                    <Button
                        color="inherit"
                        href={FRONT_URL.notepad.write}
                    >글쓰기</Button>
                </Toolbar>
            </AppBar>


            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    {/*<Grid item>*/}

                    {/*<Button*/}
                    {/*    aria-label={'123123'}*/}
                    {/*    >*/}
                    {/*    /!*!!!!*!/*/}
                    {/*</Button>*/}
                    {/*</Grid>*/}

                    {/* Recent Deposits */}
                    {notepadList.map((notepad) => (
                        <Grid item xs={12} md={4} lg={3} key={notepad.notepadSeq}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                    overflow: 'auto',
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
                                overflow: 'auto',
                            }}
                        >
                            {/*테스트용 바로뜨는 notepad*/}
                            {/*<Deposits/>*/}
                            <Notepad/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                                overflow: 'auto',
                            }}
                        >
                            {/*테스트용 바로뜨는 notepad*/}
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