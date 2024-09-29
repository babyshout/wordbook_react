import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";
import FRONT_URL from "../../assets/enum/frontUrl.js";
import Paper from "@mui/material/Paper";
import Notepad from "../notepad/Notepad.jsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const commentMock = [
    {
        CONTENT:"comment 1",
        REG_DATE: "20240901",
        REG_ID: "test id 1",
    },
    {
        CONTENT:"comment 2",
        REG_DATE: "20240901",
        REG_ID: "test id 2",
    },
    {
        CONTENT:"comment 3",
        REG_DATE: "20240901",
        REG_ID: "test id 3",
    },
]

export default function WordComment({wordName = "주식"}) {

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
                    <Grid>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            내용 : {comment.CONTENT}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom align={"right"}>
                            <Typography variant="caption" color="textSecondary" gutterBottom align={"left"}>
                                작성자 : {comment.REG_ID}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom align={"right"}>
                            <Typography variant="caption" color="textSecondary" gutterBottom align={"right"}>
                                작성일 : {comment.REG_DATE}
                            </Typography>
                        </Typography>
                    </Grid>
                    <Divider/>
                </Fragment>
            ))}
        </Fragment>
    )
}