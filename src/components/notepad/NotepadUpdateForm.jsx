import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import {FormContainer, TextFieldElement, useForm, useFormContext} from "react-hook-form-mui";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";
import {useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function NotepadUpdateForm({
                                               // notepadResponse = {
                                               //     notepadSeq: 1,
                                               //     content: '123',
                                               //     regDate: new Date(),
                                               //     chgDate: new Date(),
                                               // }
                                           }) {

    // console.log(notepadResponse);

    // const {content, regDate, chgDate} = notepadResponse;

    const [contentOfNotepad, setContentOfNotepad] = useState('11123123');

    // console.log(content);

    const [notepadResponse, setNotepadResponse] = useState({
        notepadSeq: 1,
        content: '123',
        regDate: new Date(),
        chgDate: new Date(),
    });


    const {notepadSeq} = useParams();

    console.log("useParams() -> ", useParams());


    // const { setValue } = useFormContext();
    // const methods = useForm({
    //     defaultValues: {
    //         content: contentOfNotepad
    //     }
    // });

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
            console.log(data)
            console.log(data.content)

            // methods.setValue('content', data.content); // 이 부분이 중요합니다.

            setNotepadResponse(data)
            setContentOfNotepad(data.content)
            console.log(contentOfNotepad)
            console.log(notepadResponse)

        }).catch(reason => {
            console.log(reason)
        })
    }, []);

    const onSuccess = (data, event) => {
        event.preventDefault();
        console.log('data -> ', data);
        console.log('event -> ', event);
        console.log('event.target.content -> ', event.target.content);
        console.log('event.target.content.value -> ', event.target.content.value);

        setContentOfNotepad(event.target.content.value);

        axios.patch(
            serverUrl.notepad.patchNotepad(notepadSeq),
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
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
                //     defaultValues={{
                //         content: contentOfNotepad
                // }}
                >
                    {/*<TextFieldElement*/}
                    {/*    name={'content'}*/}
                    {/*    id={'content'}*/}
                    {/*    required*/}
                    {/*    fullWidth*/}
                    {/*    // rows={10}*/}
                    {/*    multiline*/}
                    {/*    // value={notepadResponse.content}*/}
                    {/*    value={contentOfNotepad}*/}
                    {/*    // value={contentOfNotepad}*/}
                    {/*    onChange={(event) => {*/}
                    {/*        // setContentOfNotepad(event.target.value)*/}

                    {/*        // setContentOfNotepad(event.target.value);*/}
                    {/*        methods.setValue('content', event.target.value);*/}
                    {/*    }}*/}
                    {/*>*/}

                    {/*</TextFieldElement>*/}
                    <TextField
                        name={'content'}
                        id={'content'}
                        required
                        fullWidth
                        // rows={10}
                        multiline
                        // value={notepadResponse.content}
                        value={contentOfNotepad}
                        // value={contentOfNotepad}
                        onChange={(event) => setContentOfNotepad(event.target.value)}
                    >

                    </TextField>
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
