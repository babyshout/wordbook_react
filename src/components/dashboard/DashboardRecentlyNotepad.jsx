import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Notepad from "../notepad/Notepad.jsx";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";
import Typography from "@mui/material/Typography";


export default function DashboardRecentlyNotepad() {

    const [notepadList, setNotepadList] = useState([])

    const getRecentlyNotepadList = () => {
        axios.get(
            serverUrl.dashboard.getRecentlyNotepadList(2),
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response);
            setNotepadList(response.data);
        }).catch((reason) => {
            console.warn(reason);
        })
    }

    useEffect(() => {
        getRecentlyNotepadList()
    }, []);


    return (
        <Fragment>
            {

                notepadList.map((notepad, index) => (
                    <Grid item xs={12} md={4} lg={3} key={notepad.notepadSeq}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                                overflow: 'auto',
                            }}
                        >
                            <Typography>
                                최근 메모장 {index + 1}
                            </Typography>
                            <Notepad notepadResponse={notepad}/>
                        </Paper>
                    </Grid>
                ))
            }
        </Fragment>
    )
}


// <Grid item xs={12} md={4} lg={3}>
//     <Paper
//         sx={{
//             p: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             height: 240,
//             overflow: 'auto',
//         }}
//     >
//         <TodaySearchWord />
//     </Paper>
// </Grid>