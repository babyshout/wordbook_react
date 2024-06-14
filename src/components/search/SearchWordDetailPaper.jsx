import Typography from '@mui/material/Typography';
import FRONT_URL from "../../assets/enum/frontUrl.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";
import {useParams} from "react-router-dom";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function SearchWordDetailPaper({}) {

    console.log("useParams() -> ", useParams());

    const {wordNameParam} = useParams()

    const [wordDocument, setWordDocument] = useState(null)
    useEffect(() => {
        axios.get(
            serverUrl.word.search.getSearchWordDetail(wordNameParam),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response);
            setWordDocument(response.data);
        }).catch(reason => {
            console.warn(reason);
        })
    }, []);


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
                        <Typography
                            component="h4"
                            // variant="h4"
                        >
                            오늘의 단어
                        </Typography>
                    </Grid>
                    <Divider/>
                    <Grid
                        item
                    >

                        <Typography
                            component="h5"
                            // variant="h4"
                        >
                            {wordDocument.wordName || "wordName 없음!"}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                    >
                        {wordDocument.wordDetailList ? wordDocument.wordDetailList.map((wordDetail) => (
                            <Typography
                                component="p"
                                key={wordDetail.supNo}
                                // variant="h4"
                            >
                                {'보조 번호' + wordDetail.supNo || '' + '    '}
                                {wordDetail.definition || ''}
                                {'    품사' + wordDetail.pos || ''}
                                {/*{definition || "definition 없음!"}*/}
                            </Typography>
                        )) : ''}
                    </Grid>
                    <div>
                        <Link color="primary"
                              href={FRONT_URL.searchWord.detail(wordDocument.wordName || '')}
                        >
                            상세보기
                        </Link>
                    </div>
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
                            {/*{notepadResponse.content || "content 없음!"}*/}
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
                                {/*{*/}
                                {/*    '등록한 날짜 ' +*/}
                                {/*    (notepadResponse.regDate || '')*/}
                                {/*    // (regDate.toLocaleDateString() || '')*/}
                                {/*}*/}
                            </div>
                            <div>
                                {/*{*/}
                                {/*    '수정된 날짜 ' +*/}
                                {/*    (notepadResponse.chgDate || '')*/}
                                {/*    // (chgDate.toLocaleDateString() || '')*/}
                                {/*}*/}
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

                </Fragment>
            }

        </Grid>

    );
}
