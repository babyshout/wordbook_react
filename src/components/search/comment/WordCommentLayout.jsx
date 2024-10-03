import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import Paper from "@mui/material/Paper";
import Notepad from "../../notepad/Notepad.jsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as PropTypes from "prop-types";
import {FormContainer} from "react-hook-form-mui";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const commentMock = [
    {
        CONTENT: "comment 1",
        REG_DATE: "20240901",
        REG_ID: "test id 1",
    },
    {
        CONTENT: "comment 2",
        REG_DATE: "20240901",
        REG_ID: "test id 2",
    },
    {
        CONTENT: "comment 3",
        REG_DATE: "20240901",
        REG_ID: "test id 3",
    },
    {
        CONTENT: "comment 4",
        REG_DATE: "20240901",
        REG_ID: "1234",
    },
]

function WordComment({comment : {CONTENT, REG_DATE, REG_ID}, loginSessionInfo : {studentId, name, email}}) {
    const [content, setContent] = useState(CONTENT)
    const [isEditable, setIsEditable] = useState(true);

    const isSameRegister = REG_ID === studentId

    console.log(isSameRegister)

    return (
        <Grid>
            <FormContainer

                // TODO 작성하기
                // onSuccess={onSuccess}
                // onError={onError}

                // disabled={true}

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
                    disabled={isEditable}
                    multiline
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                >

                </TextField>
                <Button
                    type={"button"}
                    color={'secondary'}
                    disabled={!isSameRegister}
                    onClick={(event) => setIsEditable(!isEditable)}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {isEditable ? "수정하기" : "취소하기"}
                </Button>
                <Button
                    type={'submit'}
                    color={'primary'}
                    variant="contained"
                    disabled={isEditable}
                    sx={{mt: 3, mb: 2}}
                >
                    저장하기
                </Button>
            </FormContainer>
            <Typography variant="body2" color="textSecondary" gutterBottom align={"right"}>
                <Typography variant="caption" color="textSecondary" gutterBottom align={"left"}>
                    작성자 : {REG_ID}
                </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom align={"right"}>
                <Typography variant="caption" color="textSecondary" gutterBottom align={"right"}>
                    작성일 : {REG_DATE}
                </Typography>
            </Typography>
        </Grid>
    );
}

WordComment.propTypes = {comment: PropTypes.any};
export default function WordCommentLayout({wordName = "주식", loginSessionInfo}) {

    // TODO 백엔드작업 후 useState([]) 로 변경하기
    // const [commentList, setCommentList] = useState([])
    const [commentList, setCommentList] = useState(commentMock)

    // TODO 백엔드 작업 후 활성화 하기
    // useEffect(() => {
    //     axios.get(
    //         serverUrl.word.comment.getWordComment(wordName),
    //         {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true,
    //         }
    //     ).then(response => {
    //         console.log(response)
    //         const data = response.data;
    //
    //         setCommentList(data)
    //     }).catch(reason => {
    //         console.log(reason)
    //         alert("문제발생!!");
    //     })
    // }, [])
    console.log(commentList);
    commentList.map(item => console.log(item))

    return (
        <Fragment>

            <h1>this is wordComment start header</h1>
            <p>wordName : {wordName}</p>
            {commentList[0].CONTENT}
            {/*{commentList}*/}
            {commentList.map((comment, index) => (
                <Fragment key={index}>
                    <Divider/>
                    <WordComment comment={comment} loginSessionInfo={loginSessionInfo} />
                </Fragment>
            ))}
        </Fragment>
    )
}