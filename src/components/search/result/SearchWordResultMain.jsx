import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React, {useEffect, useRef, useState} from "react";
import SearchWordResult from "../SearchWordResult.jsx";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import useRecentlySearchWord from "../hooks/useRecentlySearchWord.js";
import SearchWordBar from "../searchwordbar/SearchWordBar.jsx";
import {useParams} from "react-router-dom";

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


/*
TODO notepadReseponse 가지고 mock 데이터 만들어서 레이아웃 확인하기
 */
export default function SearchWordResultMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);

    const [wordOptions] = useRecentlySearchWord();

    const [searchSimpleWordResponse, setSearchSimpleWordResponse] = useState([])

    const {wordNameParam} = useParams()
    const data = {
        wordName: wordNameParam
    }
    console.log('data -> ', data);
    console.log(useParams());
    useEffect(() => {
        axios.post(
            serverUrl.word.search.postGetSearchSimpleWordList,
            data,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response);
            const data = response.data;

            setSearchSimpleWordResponse(data)
        }).catch(reason => {
            console.log(reason)
            alert("단어 검색 조회결과 실패!!")
        });
    }, []);

    if (!loginSessionInfo) {
        alert("로그인된 사용자만 이용가능한 서비스입니다");
        location.href = FRONT_URL.login;
    }
    if (!searchSimpleWordResponse) {
        alert("searchSimpleWordResponse 가 비어있음!!")
    }

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

            <SearchWordBar wordOptions={wordOptions} wordNameParam={wordNameParam}/>


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

                    {searchSimpleWordResponse.map((searchWordResponse) => (
                        <Grid item xs={12} md={4} lg={3} key={searchWordResponse.definition}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                    overflow: 'auto',
                                }}
                            >
                                <SearchWordResult searchWordResponse={searchWordResponse}/>
                            </Paper>
                        </Grid>
                    ))}



                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}
