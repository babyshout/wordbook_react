import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TodaySearchWord from "../search/TodaySearchWord.jsx";
import DashboardRecentlyNotepad from "./DashboardRecentlyNotepad.jsx";
import FRONT_URL from "../../assets/enum/frontUrl.js";
import MywordSimplePaper from "../myword/MywordSimplePaper.jsx";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";
import {useEffect, useState} from "react";

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


export default function DashboardMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);


    if (!loginSessionInfo) {
        alert("로그인된 사용자만 이용가능한 서비스입니다");
        location.href = FRONT_URL.login;
    }

    const [mywordList, setMywordList] = useState([]);

    const [recentlySearch, setRecentlySearch] = useState(null)


    /**
     * 전체 myword 가져오고, RECENTLY_SEARCH 만 남김!!
     */
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
            const data = response.data.filter(asdf => asdf.mywordName === "RECENTLY_SEARCH")
            console.log('data -> ', data)
            if (data[0]) {
                setRecentlySearch(data[0])
            }
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

            {/*<SearchWordBar />*/}


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


                    {/*{notepadList.map((notepad) => (*/}
                    {/*    <Grid item xs={12} md={4} lg={3} key={notepad.notepadSeq}>*/}
                    {/*        <Paper*/}
                    {/*            sx={{*/}
                    {/*                p: 2,*/}
                    {/*                display: 'flex',*/}
                    {/*                flexDirection: 'column',*/}
                    {/*                height: 240,*/}
                    {/*                overflow: 'auto',*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <SearchWordResult notepadResponse={notepad}/>*/}
                    {/*        </Paper>*/}
                    {/*    </Grid>*/}
                    {/*))}*/}

                    <DashboardRecentlyNotepad/>

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
                            {recentlySearch &&
                                <MywordSimplePaper myword={recentlySearch}/>
                            }
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
                            <TodaySearchWord/>
                        </Paper>
                    </Grid>
                    {/*<Grid item xs={12} md={4} lg={3}>*/}
                    {/*    <Paper*/}
                    {/*        sx={{*/}
                    {/*            p: 2,*/}
                    {/*            display: 'flex',*/}
                    {/*            flexDirection: 'column',*/}
                    {/*            height: 240,*/}
                    {/*            overflow: 'auto',*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <SearchWordResult/>*/}
                    {/*    </Paper>*/}
                    {/*</Grid>*/}

                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}
