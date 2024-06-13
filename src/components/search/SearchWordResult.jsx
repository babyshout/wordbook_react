import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from "../dashboard/Title.jsx";
import FRONT_URL from "../../assets/enum/frontUrl.js";
import Grid from "@mui/material/Grid";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function SearchWordResult({
                                    searchWordResponse = {
                                        wordName: 'wordName',
                                        definition: 'word definition'
                                    }
                                }) {

    // console.log(notepadResponse);

    const {wordName, definition} = searchWordResponse;

    console.log("searchWordResponse", searchWordResponse);


    return (

        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            href={FRONT_URL.searchWord.detail(wordName)}
        >
            <Grid
                item
            >
                <Typography
                    component="h5"
                    // variant="h4"
                >
                    {wordName || "wordName 없음!"}
                </Typography>
            </Grid>
            <Grid
                item
            >
                <Typography
                    component="p"
                    // variant="h4"
                >
                    {definition || "definition 없음!"}
                </Typography>
            </Grid>
            <div>
                <Link color="primary"
                      href={FRONT_URL.searchWord.detail(wordName)}
                >
                    상세보기
                </Link>
            </div>


        </Grid>
    );
}
