import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import {Copyright} from "@mui/icons-material";
import SearchWordDetailPaper from "../SearchWordDetailPaper.jsx";
import SearchWordBar from "../searchwordbar/SearchWordBar.jsx";
import useRecentlySearchWord from "../hooks/useRecentlySearchWord.js";
import {useParams} from "react-router-dom";





export default function SearchWordResultDetailMain({loginSessionInfo = null}) {

    console.log(loginSessionInfo);


    // const [wordOptions] = useRecentlySearchWord();
    // const {wordNameParam} = useParams()

    if (!loginSessionInfo) {
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
            <SearchWordBar />


            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>

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
                            <SearchWordDetailPaper />
                        </Paper>
                    </Grid>

                </Grid>

                {/*맨 아래 카피라이트 부분*/}
                <Copyright sx={{pt: 4}}/>
            </Container>
        </Box>)
}