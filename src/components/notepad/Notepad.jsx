import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FRONT_URL from "../../assets/enum/frontUrl.js";
import Grid from "@mui/material/Grid";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function Notepad({
                                    notepadResponse = {
                                        notepadSeq: 1,
                                        content: '123',
                                        regDate: new Date(),
                                        chgDate: new Date(),
                                    }
                                }) {

    // console.log(notepadResponse);

    const {notepadSeq, content, regDate, chgDate} = notepadResponse;

    console.log(content);


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
                    {content || "content 없음!"}
                </Typography>
            </Grid>

            <Grid
                item
            >

                {/*<Typography color="text.secondary" sx={{flex: 1}}>*/}
                {/*    /!*TODO Date 띄워보기*!/*/}
                {/*    /!*registered on {regDate}*!/*/}
                {/*    /!*registered on {typeof regDate}*!/*/}
                {/*</Typography>*/}
                <Typography color="text.secondary" sx={{flex: 1}}>
                    <div>
                        {
                            '등록한 날짜 ' +
                            (regDate || '')
                            // (regDate.toLocaleDateString() || '')
                        }
                    </div>
                    <div>
                        {
                            '수정된 날짜 ' +
                            (chgDate || '')
                            // (chgDate.toLocaleDateString() || '')
                        }
                    </div>
                    {/*changed on {chgDate}*/}
                </Typography>
                <div>
                    <Link color="primary"
                          href={FRONT_URL.notepad.detail(notepadSeq)}
                    >
                        상세보기
                    </Link>
                </div>
            </Grid>
        </Grid>
    );
}
