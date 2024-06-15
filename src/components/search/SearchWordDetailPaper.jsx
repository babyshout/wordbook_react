import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";
import {useParams} from "react-router-dom";
import Divider from "@mui/material/Divider";
import AddWordNameToMywordModal from "./AddWordNameToMywordModal.jsx";

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
                        <AddWordNameToMywordModal
                            wordName={wordNameParam}
                        />

                    </Grid>
                    <Divider/>

                    <Grid
                        item
                    >

                        <Typography
                            component="h5"
                        >
                            {wordDocument.wordName || "wordName 없음!"}
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid
                        item
                    >
                        {wordDocument.wordDetailList ? wordDocument.wordDetailList.map((wordDetail) => (
                            <div
                                key={wordDetail.supNo}
                                // variant="h4"
                            >
                                <Typography
                                >

                                {'보조 번호' + wordDetail.supNo || '' + '    '}
                                </Typography>
                                {wordDetail.definition || ''}
                                <Typography>

                                {'품사 ' + wordDetail.pos || ''}
                                </Typography>
                                <Divider />
                            </div>

                        )) : ''}
                    </Grid>



                </Fragment>
            }

        </Grid>

    );
}
