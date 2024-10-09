import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as PropTypes from "prop-types";
import {FormContainer} from "react-hook-form-mui";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const commentMock = [
    {
        wordName: "주식",
        wordCommentSeq : "1",
        content: "comment 1",
        regDate: "20240901",
        regId: "test id 1",
    },
    {
        content: "comment 2",
        regDate: "20240901",
        regId: "test id 2",
    },
    {
        content: "comment 3",
        regDate: "20240901",
        regId: "test id 3",
    },
    {
        content: "comment 4",
        regDate: "20240901",
        regId: "1234",
    },
]

WordComment.propTypes = {
    comment: PropTypes.object,
    loginSessionInfo: PropTypes.object,
    resetCommentList: PropTypes.func,
    wordName: PropTypes.string,
};

function WordComment({
                         comment,
                         loginSessionInfo: {studentId, name, email},
                         resetCommentList,
                         wordName
                     }) {
    const [content, setContent] = useState(comment.content)
    const [isEditable, setIsEditable] = useState(false);

    const wordCommentSeq = comment.wordCommentSeq;


    const isSameRegister = comment.regId === studentId


    const handleDelete = () => {
        axios.delete(
            serverUrl.word.comment.deleteWordCommentByIdAndWordName(wordName, studentId, wordCommentSeq),
            {
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            alert("삭제 성공!!")
            resetCommentList();
        }).catch(reason => {
            console.log(reason)
            alert("삭제 실패!!")
            resetCommentList();
        })
    }

    const handlePatch = () => {
        axios.patch(
            serverUrl.word.comment.patchWordComment(wordName, wordCommentSeq),
            JSON.stringify({content: content}),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            resetCommentList()
            setIsEditable(false);
        }).catch(reason => {
            console.log(reason)
            resetCommentList()
        })
    }

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

                <TextField
                    name={'content'}
                    id={'content'}
                    required
                    fullWidth
                    disabled={!isEditable}
                    multiline
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                >

                </TextField>
                <Button
                    type={'button'}
                    color={'warning'}
                    variant="contained"
                    disabled={!isEditable}
                    sx={{mt: 3, mb: 2}}
                    onClick={(event) => handleDelete()}
                >
                    삭제하기
                </Button>
                <Button
                    type={"button"}
                    color={'secondary'}
                    disabled={!isSameRegister}
                    onClick={(event) => {
                        setIsEditable(!isEditable)
                        if (isEditable) {
                            resetCommentList();
                        }
                    }}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {isEditable ? "취소하기" : "수정하기"}
                </Button>
                <Button
                    type={'submit'}
                    color={'primary'}
                    variant="contained"
                    disabled={!isEditable}
                    sx={{mt: 3, mb: 2}}
                    onClick={(event) => {
                        event.preventDefault()
                        handlePatch();
                    }}
                >
                    저장하기
                </Button>
            </FormContainer>
            <Typography variant="body2" color="textSecondary" gutterBottom align={"right"}>
                <Typography variant="caption" color="textSecondary" gutterBottom align={"left"}>
                    작성자 : {comment.regId}
                </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom align={"right"}>
                <Typography variant="caption" color="textSecondary" gutterBottom align={"right"}>
                    작성일 : {comment.regDate}
                </Typography>
            </Typography>
        </Grid>
    );
}


NewWordComment.propTypes = {
    comment: PropTypes.object,
    loginSessionInfo: PropTypes.object,
    resetCommentList: PropTypes.func,
    wordName: PropTypes.string,
};

function NewWordComment({
                         loginSessionInfo: {studentId, name, email},
                         resetCommentList,
                         wordName
                     }) {
    const [content, setContent] = useState("댓글 내용")

    const handlePost = () => {
        axios.post(
            serverUrl.word.comment.postWordComment(wordName),
            JSON.stringify({content: content, wordName: wordName}),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            resetCommentList()
        }).catch(reason => {
            console.log(reason)
            resetCommentList()
        })
    }

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

                <TextField
                    name={'content'}
                    id={'content'}
                    required
                    fullWidth
                    multiline
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                >

                </TextField>
                <Button
                    type={'submit'}
                    color={'primary'}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    onClick={(event) => {
                        event.preventDefault()
                        handlePost();
                    }}
                >
                    저장하기
                </Button>
            </FormContainer>
        </Grid>
    );
}

WordCommentLayout.propTypes = {
    wordName: PropTypes.string,
    loginSessionInfo: PropTypes.object
}
export default function WordCommentLayout({wordName = "주식", loginSessionInfo}) {

    // TODO 백엔드작업 후 useState([]) 로 변경하기
    // const [commentList, setCommentList] = useState([])
    const [commentList, setCommentList] = useState([])

    const getWordComment = () => {
        axios.get(
            serverUrl.word.comment.getWordComment(wordName),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            const data = response.data;

            // setCommentList(data)
            setCommentList(response.data);
        }).catch(reason => {
            console.log(reason)
            alert("문제발생!!");
        })
    }

    // TODO 백엔드 작업 후 활성화 하기
    useEffect(() => {
        getWordComment()
    }, [])

    return (
        <Fragment>

            <h1>this is wordComment start header</h1>
            <p>wordName : {wordName}</p>
            {/*{commentList}*/}
            {commentList && commentList.map((comment, index) => (
                <Fragment
                    // NOTE wordCommentSeq, Math.random() 둘중에 하나로 키값 잡기
                    key={comment.wordCommentSeq}
                    // key={Math.random()}
                >
                    <Divider/>
                    <WordComment comment={comment}
                                 loginSessionInfo={loginSessionInfo}
                                 resetCommentList={getWordComment}
                                 wordName={wordName}
                    />
                </Fragment>
            ))}
            <NewWordComment loginSessionInfo={loginSessionInfo}
                            resetCommentList={getWordComment}
                            wordName={wordName}
            />
        </Fragment>
    )
}