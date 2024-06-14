import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FRONT_URL from "../../assets/enum/frontUrl.js";
import useGetTodaySearchWord from "./hooks/useGetTodaySearchWord.js";


export default function TodaySearchWord() {
    const [todaySearchWord] = useGetTodaySearchWord();

    console.log('todaySearchWord -> ', todaySearchWord);


    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            href={FRONT_URL.searchWord.detail(todaySearchWord.wordName || '')}
        >
            <Grid
                item
            >
                <Typography
                    component="h5"
                    // variant="h4"
                >
                    {todaySearchWord.wordName || "wordName 없음!"}
                </Typography>
            </Grid>
            <Grid
                item
            >
                {todaySearchWord.wordDetailList ? todaySearchWord.wordDetailList.map((wordDetail) => (
                    <Typography
                        component="p"
                        key={wordDetail.supNo}
                        // variant="h4"
                    >
                        {'보조 번호' + wordDetail.supNo || '' + '    '}
                        {wordDetail.definition || ''}
                        {'    품사' + wordDetail.pos || ''}
                        {/*{definition || "definition 없음!"}*/}
                    </Typography>
                )) : ''}
            </Grid>
            <div>
                <Link color="primary"
                      href={FRONT_URL.searchWord.detail(todaySearchWord.wordName || '')}
                >
                    상세보기
                </Link>
            </div>

        </Grid>
    )
}