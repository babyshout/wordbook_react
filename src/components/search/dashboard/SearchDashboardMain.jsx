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





const options = ['Option 1', 'Option 2'];



/*
TODO notepadReseponse 가지고 mock 데이터 만들어서 레이아웃 확인하기
 */
export default function SearchDashboardMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);

    // FIXME 기존에 notepadList 레이아웃 사용해서.. 레이아웃 확인만 보고 나중에 지울것
    const [notepadList, setNotepadList] = useState([]);

    const [searchValue, setSearchValue] = React.useState(
        // options[0]
        ''
    );
    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [wordOptions, setWordOptions] = useState([])

    // FIXME 123
    // const searchWordFieldRef = useRef(null);

    if (!loginSessionInfo) {
        // FIXME 로그인 확인 로직 활성화 할것
        // alert("로그인된 사용자만 이용가능한 서비스입니다");
        // location.href = FRONT_URL.login;
    }

    /**
     * notepad List 호출시 사용
     */
    function getRecentlySearchWord() {
        console.log("getRecentlySearchWord 호출 시작!!!!");
        axios.get(
            serverUrl.word.search.getRecentlySearchWord,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response);
            // setWordOptions(response.data);
        }).catch((reason) => {
            console.log(reason)
            alert("알수없는 문제 발생")
        })


        setNotepadList(getMockNotepadResponseList())
        // fixme 지울것
        setWordOptions(top100Films)
        console.log('notepadList -> ', notepadList);
        console.log('wordOptions -> ', wordOptions);
    }


    useEffect(() => {
        getRecentlySearchWord()

    }, []);

    /**
     * searchWordButton 클릭 이벤트 핸들링용 함수
     * @param event
     */
    function handleSearchWordButtonOnClick(event) {
        event.preventDefault()
        console.log(event);
        alert("searchWordButton 클릭됨!!")

        if (!searchInputValue) {
            alert("검색할 단어가 비어있습니다")
            document.getElementById('search-word-field').focus()
            return;
        }
    }

    function handleWordTypoCheckButton(event) {
        event.preventDefault()
        console.log(event);
        alert("handleWordTypoCheckButton 클릭됨!!")

        if (!searchInputValue) {
             alert("검색할 단어가 비어있습니다")
            document.getElementById('search-word-field').focus()
            return;
        }

        setSearchInputValue('123123123')
        // setSearchValue('111111111111111')

        axios.get(
            serverUrl.word.search.getWordTypoCheck,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            },
        ).then(response => {
            console.log(response)
            const data = response.data

            alert('오타확인.. [' + data + '] 결과 반환..')
        }).catch(reason => {
            console.log(reason)
            alert(reason.response.data.message)
        })
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
                        name={'wordTypoCheckButton'}
                        id={'wordTypoCheckButton'}
                        onClick={handleWordTypoCheckButton}
                    >오타확인</Button>
                    <div>
                        <div>{`searchValue: ${searchValue !== null ? `'${searchValue}'` : 'null'}`}</div>
                        <div>{`searchInputValue: '${searchInputValue}'`}</div>
                        {/*<hr/>*/}
                        <Divider variant="middle" />
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

const top100Films = [
    {wordName: 'The Shawshank Redemption', year: 1994},
    {wordName: 'The Godfather', year: 1972},
    {wordName: 'The Godfather: Part II', year: 1974},
    {wordName: 'The Dark Knight', year: 2008},
    {wordName: '12 Angry Men', year: 1957},
    {wordName: "Schindler's List", year: 1993},
    {wordName: 'Pulp Fiction', year: 1994},
    {
        wordName: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    {wordName: 'The Good, the Bad and the Ugly', year: 1966},
    {wordName: 'Fight Club', year: 1999},
    {
        wordName: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        wordName: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    {wordName: 'Forrest Gump', year: 1994},
    {wordName: 'Inception', year: 2010},
    {
        wordName: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    {wordName: "One Flew Over the Cuckoo's Nest", year: 1975},
    {wordName: 'Goodfellas', year: 1990},
    {wordName: 'The Matrix', year: 1999},
    {wordName: 'Seven Samurai', year: 1954},
    {
        wordName: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    {wordName: 'City of God', year: 2002},
    {wordName: 'Se7en', year: 1995},
    {wordName: 'The Silence of the Lambs', year: 1991},
    {wordName: "It's a Wonderful Life", year: 1946},
    {wordName: 'Life Is Beautiful', year: 1997},
    {wordName: 'The Usual Suspects', year: 1995},
    {wordName: 'Léon: The Professional', year: 1994},
    {wordName: 'Spirited Away', year: 2001},
    {wordName: 'Saving Private Ryan', year: 1998},
    {wordName: 'Once Upon a Time in the West', year: 1968},
    {wordName: 'American History X', year: 1998},
    {wordName: 'Interstellar', year: 2014},
    {wordName: 'Casablanca', year: 1942},
    {wordName: 'City Lights', year: 1931},
    {wordName: 'Psycho', year: 1960},
    {wordName: 'The Green Mile', year: 1999},
    {wordName: 'The Intouchables', year: 2011},
    {wordName: 'Modern Times', year: 1936},
    {wordName: 'Raiders of the Lost Ark', year: 1981},
    {wordName: 'Rear Window', year: 1954},
    {wordName: 'The Pianist', year: 2002},
    {wordName: 'The Departed', year: 2006},
    {wordName: 'Terminator 2: Judgment Day', year: 1991},
    {wordName: 'Back to the Future', year: 1985},
    {wordName: 'Whiplash', year: 2014},
    {wordName: 'Gladiator', year: 2000},
    {wordName: 'Memento', year: 2000},
    {wordName: 'The Prestige', year: 2006},
    {wordName: 'The Lion King', year: 1994},
    {wordName: 'Apocalypse Now', year: 1979},
    {wordName: 'Alien', year: 1979},
    {wordName: 'Sunset Boulevard', year: 1950},
    {
        wordName: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    {wordName: 'The Great Dictator', year: 1940},
    {wordName: 'Cinema Paradiso', year: 1988},
    {wordName: 'The Lives of Others', year: 2006},
    {wordName: 'Grave of the Fireflies', year: 1988},
    {wordName: 'Paths of Glory', year: 1957},
    {wordName: 'Django Unchained', year: 2012},
    {wordName: 'The Shining', year: 1980},
    {wordName: 'WALL·E', year: 2008},
    {wordName: 'American Beauty', year: 1999},
    {wordName: 'The Dark Knight Rises', year: 2012},
    {wordName: 'Princess Mononoke', year: 1997},
    {wordName: 'Aliens', year: 1986},
    {wordName: 'Oldboy', year: 2003},
    {wordName: 'Once Upon a Time in America', year: 1984},
    {wordName: 'Witness for the Prosecution', year: 1957},
    {wordName: 'Das Boot', year: 1981},
    {wordName: 'Citizen Kane', year: 1941},
    {wordName: 'North by Northwest', year: 1959},
    {wordName: 'Vertigo', year: 1958},
    {
        wordName: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    {wordName: 'Reservoir Dogs', year: 1992},
    {wordName: 'Braveheart', year: 1995},
    {wordName: 'M', year: 1931},
    {wordName: 'Requiem for a Dream', year: 2000},
    {wordName: 'Amélie', year: 2001},
    {wordName: 'A Clockwork Orange', year: 1971},
    {wordName: 'Like Stars on Earth', year: 2007},
    {wordName: 'Taxi Driver', year: 1976},
    {wordName: 'Lawrence of Arabia', year: 1962},
    {wordName: 'Double Indemnity', year: 1944},
    {
        wordName: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    {wordName: 'Amadeus', year: 1984},
    {wordName: 'To Kill a Mockingbird', year: 1962},
    {wordName: 'Toy Story 3', year: 2010},
    {wordName: 'Logan', year: 2017},
    {wordName: 'Full Metal Jacket', year: 1987},
    {wordName: 'Dangal', year: 2016},
    {wordName: 'The Sting', year: 1973},
    {wordName: '2001: A Space Odyssey', year: 1968},
    {wordName: "Singin' in the Rain", year: 1952},
    {wordName: 'Toy Story', year: 1995},
    {wordName: 'Bicycle Thieves', year: 1948},
    {wordName: 'The Kid', year: 1921},
    {wordName: 'Inglourious Basterds', year: 2009},
    {wordName: 'Snatch', year: 2000},
    {wordName: '3 Idiots', year: 2009},
    {wordName: 'Monty Python and the Holy Grail', year: 1975},
];