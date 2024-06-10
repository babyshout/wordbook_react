import Typography from '@mui/material/Typography';
import FRONT_URL from "../../assets/enum/frontUrl.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";
import {useParams} from "react-router-dom";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function SearchWordDetailPaper({
                                               // notepadResponse = {
                                               //     notepadSeq: 1,
                                               //     content: '123',
                                               //     regDate: new Date(),
                                               //     chgDate: new Date(),
                                               // }
                                           }) {

    // console.log(notepadResponse);

    // const {content, regDate, chgDate} = notepadResponse;

    const [notepadResponse, setNotepadResponse] = useState({
        notepadSeq: 1,
        content: '123',
        regDate: new Date(),
        chgDate: new Date(),
    });


    const {notepadSeq} = useParams();

    console.log("useParams() -> ", useParams());


    useEffect(() => {
        console.log(serverUrl.notepad.getNotepad(notepadSeq))
        axios.get(
            serverUrl.notepad.getNotepad(notepadSeq),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            const data = response.data;

            setNotepadResponse(data)

        }).catch(reason => {
            console.log(reason)
        })
    }, []);


    const handleDeleteOnclick = (event) => {
        console.log(event)
        // event.preventDefault()

        axios.delete(
            serverUrl.notepad.getNotepad(notepadSeq),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            alert("삭제 성공!!")
            location.href = FRONT_URL.notepad.list;
        }).catch(reason => {
            console.log(reason)
            alert("삭제 실패!!")
        })
    }

    return (

        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
        >
            {/*<Grid*/}
            {/*    item*/}
            {/*>*/}
            {/*    <FormContainer*/}
            {/*        onSuccess={onSuccess}*/}
            {/*        onError={onError}*/}
            {/*    >*/}
            {/*        <TextFieldElement*/}
            {/*            name={'content'}*/}
            {/*            id={'content'}*/}
            {/*            required*/}
            {/*            fullWidth*/}
            {/*            // rows={10}*/}
            {/*            multiline*/}
            {/*        >*/}

            {/*        </TextFieldElement>*/}
            {/*        <Button*/}
            {/*            type={'submit'}*/}
            {/*            color={'primary'}*/}
            {/*            variant="contained"*/}
            {/*            sx={{mt: 3, mb: 2}}*/}
            {/*        >*/}
            {/*            저장하기*/}
            {/*        </Button>*/}
            {/*    </FormContainer>*/}
            {/*    <Typography*/}
            {/*        component="p"*/}
            {/*        // variant="h4"*/}
            {/*    >*/}
            {/*        {contentOfNotepad || "content 없음!"}*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}

            <Grid
                item
            >
                <Typography
                    component="p"
                    // variant="h4"
                >
                    {notepadResponse.content || "content 없음!"}
                </Typography>
            </Grid>

            <Grid
                item
            >


                <Typography color="text.secondary" sx={{flex: 1}}>
                    {/*TODO Date 띄워보기*/}
                    {/*registered on {regDate}*/}
                    {/*registered on {typeof regDate}*/}
                </Typography>
                <Typography color="text.secondary" sx={{flex: 1}}>
                    <div>
                        {
                            '등록한 날짜 ' +
                            (notepadResponse.regDate || '')
                            // (regDate.toLocaleDateString() || '')
                        }
                    </div>
                    <div>
                        {
                            '수정된 날짜 ' +
                            (notepadResponse.chgDate || '')
                            // (chgDate.toLocaleDateString() || '')
                        }
                    </div>
                    {/*changed on {chgDate}*/}
                </Typography>
                <div>
                    <Button
                        color="primary"
                        variant={'outlined'}
                        href={FRONT_URL.notepad.update(notepadSeq)}
                        // onClick={handleUpdateOnclick}
                    >
                        수정
                    </Button>
                    <Button
                        color="primary"
                        variant={"contained"}
                        // href={FRONT_URL.notepad.detail(notepadSeq)}
                        onClick={handleDeleteOnclick}
                    >
                        삭제
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
}
