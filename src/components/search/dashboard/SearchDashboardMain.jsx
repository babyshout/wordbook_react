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
import Button from "@mui/material/Button";
import {AppBar, Autocomplete} from "@mui/material";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import frontUrl from "../../../assets/enum/frontUrl.js";
import useRecentlySearchWord from "../hooks/useRecentlySearchWord.js";
import useHandleSearchBar from "../hooks/useHandleSearchBar.js";

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


/*
TODO notepadReseponse 가지고 mock 데이터 만들어서 레이아웃 확인하기
 */
export default function SearchDashboardMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);


    const [wordOptions, notepadList] = useRecentlySearchWord();

    const [searchValue,
        setSearchValue,
        searchInputValue,
        setSearchInputValue,
        handleSearchWordButtonOnClick,
        handleWordErrataCheckButton
    ] = useHandleSearchBar();

    if (!loginSessionInfo) {
        // FIXME 로그인 확인 로직 활성화 할것
        alert("로그인된 사용자만 이용가능한 서비스입니다");
        location.href = FRONT_URL.login;
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
            <AppBar
                // position="fixed"
                // position="absolute"
                position="sticky"
                // position="static"
                // position="relative"
                color={'default'}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        검색 메뉴바
                    </Typography>
                    <Button
                        // color="inherit"
                        // color="primary"
                        // color="secondary"
                        // color="error"
                        color="info"
                        // color="success"
                        // color="warning"
                        variant={'contained'}
                        // href={FRONT_URL.notepad.write}
                        name={'wordErrataCheckButton'}
                        id={'wordErrataCheckButton'}
                        onClick={handleWordErrataCheckButton}
                    >오타확인</Button>
                    <div>
                        <div>{`searchValue: ${searchValue !== null ? `'${searchValue}'` : 'null'}`}</div>
                        <div>{`searchInputValue: '${searchInputValue}'`}</div>
                        {/*<hr/>*/}
                        <Divider variant="middle"/>
                        123123
                        <Autocomplete
                            value={searchValue}
                            onChange={(event, newValue) => {
                                setSearchValue(newValue);
                            }}
                            inputValue={searchInputValue}
                            onInputChange={(event, newInputValue) => {
                                setSearchInputValue(newInputValue);
                            }}
                            id="search-word-field"
                            // options={options}
                            options={wordOptions.map(
                                (option) => option.wordName)}
                            sx={{width: 300}}

                            disableClearable
                            freeSolo


                            renderInput={(params) => {
                                console.log(params)
                                return <TextField
                                    {...params}
                                    label="검색할 단어"
                                    autoFocus
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search'
                                    }}
                                />
                            }}
                        />
                    </div>
                    <Button
                        // color="inherit"
                        // color="primary"
                        // color="secondary"
                        // color="error"
                        color="info"
                        // color="success"
                        // color="warning"
                        variant={'contained'}
                        // href={FRONT_URL.notepad.write}
                        name={'searchWordButton'}
                        id={'searchWordButton'}
                        onClick={handleSearchWordButtonOnClick}
                    >단어검색</Button>
                </Toolbar>
            </AppBar>


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
                                <SearchWordResult notepadResponse={notepad}/>
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
                            <SearchWordResult/>
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
                            <SearchWordResult/>
                        </Paper>
                    </Grid>

                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}
