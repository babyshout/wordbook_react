import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import {Fragment} from "react";
import Divider from "@mui/material/Divider";


const wordDocumentMock = {
    wordName: '123',
    wordDetailList: [
        {
            definition: 'definition!',
            supNo: 1,
        }
    ]
}

export default function MywordDetailPaper({wordDocument}) {

    const {wordName, wordDetailList} = wordDocument;


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

                    </Grid>
                    <Divider/>

                    <Grid
                        item
                    >

                        <Typography
                            component="h5"
                        >
                            {wordName || "wordName 없음!"}
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
