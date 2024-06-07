import Typography from '@mui/material/Typography';
import FRONT_URL from "../../assets/enum/frontUrl.js";
import Grid from "@mui/material/Grid";
import {FormContainer, TextFieldElement} from "react-hook-form-mui";
import Button from "@mui/material/Button";
import {useState} from "react";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function NotepadWritingForm({
                                         notepadResponse = {
                                             notepadSeq: 1,
                                             content: '123',
                                             regDate: new Date(),
                                             chgDate: new Date(),
                                         }
                                     }) {

    // console.log(notepadResponse);

    const {notepadSeq, content, regDate, chgDate} = notepadResponse;

    const [contentOfNotepad, setContentOfNotepad] = useState(null);

    console.log(content);

    const onSuccess = (data, event) => {
        event.preventDefault();
        console.log('data -> ', data);
        console.log('event -> ', event);

        setContentOfNotepad(data.content);

        axios.post(
            serverUrl.notepad.postCreateNotepad,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)

            const notepadSeq = response.data.notepadSeq
            console.log("notepadSeq -> ", notepadSeq)
            if(notepadSeq) {
                location.href = FRONT_URL.notepad.detail(notepadSeq)
            }
        }).catch(reason => {
            console.log(reason)
        })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

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
                <FormContainer
                    onSuccess={onSuccess}
                    onError={onError}
                >
                    <TextFieldElement
                        name={'content'}
                        id={'content'}
                        required
                        fullWidth
                        // rows={10}
                        multiline
                    >

                    </TextFieldElement>
                    <Button
                        type={'submit'}
                        color={'primary'}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        저장하기
                    </Button>
                </FormContainer>
                <Typography
                    component="p"
                    // variant="h4"
                >
                    {contentOfNotepad || "content 없음!"}
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
                {/*<Typography color="text.secondary" sx={{flex: 1}}>*/}
                {/*    <div>*/}
                {/*        {*/}
                {/*            '등록한 날짜 ' +*/}
                {/*            (regDate.toLocaleDateString() || '')*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        {*/}
                {/*            '수정된 날짜 ' +*/}
                {/*            (chgDate.toLocaleDateString() || '')*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*    /!*changed on {chgDate}*!/*/}
                {/*</Typography>*/}
                {/*<div>*/}
                {/*    <Link color="primary"*/}
                {/*          href={FRONT_URL.notepad.detail(notepadSeq)}*/}
                {/*    >*/}
                {/*        상세보기*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </Grid>
        </Grid>
    );
}
