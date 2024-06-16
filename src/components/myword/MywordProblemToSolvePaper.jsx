import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import {Fragment, useState} from "react";
import Divider from "@mui/material/Divider";
import {useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";


const wordDocumentMock = {
    wordName: '123',
    wordDetailList: [
        {
            definition: 'definition!',
            supNo: 1,
        }
    ]
}

export default function MywordProblemToSolvePaper({wordDocument}) {

    const {wordName, wordDetailList} = wordDocument;

    const {mywordNameParam} = useParams();

    const [wordNameAnswer, setWordNameAnswer] = useState('')

    console.log('wordName -> ', wordName);
    console.log('wordDetailList -> ', wordDetailList);
    console.log('mywordNameParam -> ', mywordNameParam);


    function handleAnswerSubmitButton(event) {
        console.log("handleAnswerSubmitButton click");

        console.log('wordNameAnswer -> ', wordNameAnswer);

        if (wordNameAnswer === wordName) {
            alert("정답입니다!")
        } else {
            alert("오답입니다!")
        }

        const data = {
            wordName: wordName,
            mywordName: mywordNameParam,
            wordNameAnswer: wordNameAnswer,
        }

        console.log('data -> ', data);

        axios.post(
            serverUrl.word.problemOfWord.postRandomWordDocumentToSolveResult,
            data,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response)
            alert("결과 등록 성공..!")
            alert("다음문제를 가져옵니다!")
            window.location.reload()
        }).catch(reason => {
            console.warn(reason)
            alert("등록 실패..!")
        })
    }

    return (


        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
        >
            {wordDocument &&
                <Fragment>

                    <Grid item>
                        {/*<AddWordNameToMywordModal*/}
                        {/*    wordName={wordNameParam}*/}
                        {/*/>*/}
                        <TextField
                            label={'단어 이름'}
                            name={'wordNameAnswer'}
                            id={"wordNameAnswer"}
                            value={wordNameAnswer}
                            onChange={(evt) => {
                                setWordNameAnswer(evt.target.value);
                            }}
                            fullWidth
                            >

                        </TextField>
                        <Button
                        onClick={handleAnswerSubmitButton}
                        variant="contained"
                        name={'wordNameAnswerSubmit'}
                        id={'wordNameAnswerSubmit'}

                        >제출하기</Button>

                    </Grid>
                    <Divider/>

                    <Grid
                        item
                    >

                        <Typography
                            component="h5"
                        >
                            {/*{wordName || "wordName 없음!"}*/}
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid
                        item
                    >
                        {wordDetailList ? wordDetailList.map((wordDetail) => (
                            <div
                                key={wordDetail.supNo}
                                // variant="h4"
                            >
                                <sup>
                                    {wordDetail.supNo || '' + '    '}
                                </sup>
                                {wordDetail.definition || ''}
                                <sub>
                                    {'품사 ' + wordDetail.pos || ''}
                                </sub>
                                <Divider/>
                            </div>

                        )) : ''}
                    </Grid>


                </Fragment>
            }

        </Grid>

    );
}
