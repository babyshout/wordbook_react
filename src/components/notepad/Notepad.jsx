import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from "../dashboard/Title.jsx";
import FRONT_URL from "../../assets/enum/frontUrl.js";

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

    console.log(notepadResponse);

    const {notepadSeq, content, regDate, chgDate} = notepadResponse;

    console.log(content);

    return (
        <React.Fragment>
            <Title>Recent Deposits</Title>
            <Typography
                component="p"
                // variant="h4"
            >
                {content}
            </Typography>
            <Typography color="text.secondary" sx={{flex: 1}}>
                {/*TODO Date 띄워보기*/}
                {/*registered on {regDate}*/}
                {/*registered on {typeof regDate}*/}
            </Typography>
            <Typography color="text.secondary" sx={{flex: 1}}>
                {/*changed on {chgDate}*/}
            </Typography>
            <div>
                <Link color="primary"
                      href={FRONT_URL.notepad.detail(notepadSeq)}
                      // href={FRONT_URL.login}
                      // onClick={preventDefault}
                >
                    상세보기
                </Link>
            </div>
        </React.Fragment>
    );
}
