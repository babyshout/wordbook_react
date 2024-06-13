import useHandleSearchBar from "../hooks/useHandleSearchBar.js";
import {AppBar, Autocomplete} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

export default function SearchWordBar({
                                          wordOptions
                                          , wordNameParam = null
                                      }) {

    const [searchValue,
        setSearchValue,
        searchInputValue,
        setSearchInputValue,
        handleSearchWordButtonOnClick,
        handleWordErrataCheckButton
    ] = useHandleSearchBar();

    if (searchInputValue) {
        setSearchInputValue(wordNameParam);
    }

    return (

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
    );
}
