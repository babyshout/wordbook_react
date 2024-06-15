import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FRONT_URL from "../../assets/enum/frontUrl.js";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function MywordSimplePaper({
                                              myword = {
                                                  mywordName: 'mywordName',
                                                  wordNameList: ['1', '2', '3', '4']
                                              }
                                          }) {

    // console.log(notepadResponse);

    const {mywordName, wordNameList} = myword;


    return (

        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
        >
            <Grid
                item
            >
                <Typography
                    component="p"
                    // variant="h4"
                >
                    {mywordName || "mywordName 없음!"}
                </Typography>
            </Grid>
            <Divider/>
            <Grid
                item
            >
                {wordNameList && wordNameList.map((wordName, index) => (
                    <Typography
                    key={index}>
                        {wordName}
                    </Typography>
                ))}

                <div>
                    <Link color="primary"
                          href={FRONT_URL.myword.detail(mywordName)}
                    >
                        상세보기
                    </Link>
                </div>
            </Grid>
        </Grid>
    );
}
