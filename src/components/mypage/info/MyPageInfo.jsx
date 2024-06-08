import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "/src/assets/enum/serverUrl.js";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import frontUrl from "/src/assets/enum/frontUrl.js";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function NotepadDetailPaper({
                                               // notepadResponse = {
                                               //     notepadSeq: 1,
                                               //     content: '123',
                                               //     regDate: new Date(),
                                               //     chgDate: new Date(),
                                               // }
                                           }) {


    const [userName, setUserName] = useState('mockName')
    const [userEmail, setUserEmail] = useState('mockEmail')


    useEffect(() => {

        axios.get(
            serverUrl.student.getStudentInfoBySession,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            const data = response.data;

            setUserName(data.name)
            setUserEmail(data.email)

        }).catch(reason => {
            console.log(reason)
        })
    }, []);



    return (

        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <TextField
                disabled
                name={"name"}
                id={"name"}
                label={"이름"}
                fullWidth
                autoFocus
                value={userName}
            />
            <TextField
                disabled
                name={"email"}
                id={"email"}
                label={"이메일"}
                fullWidth
                autoFocus
                value={userEmail}
            />
            <Divider
            sx={{my: 2}}
            />

            <Button
                // sx={{
                //     width: '100vw'
                // }}
                href={frontUrl.mypage.update}
                variant="contained"
            >
                회원정보 수정하기
            </Button>

            <Divider/>
            <Typography
                >
                123123123 뭐 띄어야됨..!!
            </Typography>
        </Stack>


    );
}

// <Grid
//     container
//     direction="column"
//     justifyContent="space-between"
//     alignItems="stretch"
// >
//     {/*<Grid*/}
//     {/*    item*/}
//     {/*>*/}
//     {/*    <FormContainer*/}
//     {/*        onSuccess={onSuccess}*/}
//     {/*        onError={onError}*/}
//     {/*    >*/}
//     {/*        <TextFieldElement*/}
//     {/*            name={'content'}*/}
//     {/*            id={'content'}*/}
//     {/*            required*/}
//     {/*            fullWidth*/}
//     {/*            // rows={10}*/}
//     {/*            multiline*/}
//     {/*        >*/}
//
//     {/*        </TextFieldElement>*/}
//     {/*        <Button*/}
//     {/*            type={'submit'}*/}
//     {/*            color={'primary'}*/}
//     {/*            variant="contained"*/}
//     {/*            sx={{mt: 3, mb: 2}}*/}
//     {/*        >*/}
//     {/*            저장하기*/}
//     {/*        </Button>*/}
//     {/*    </FormContainer>*/}
//     {/*    <Typography*/}
//     {/*        component="p"*/}
//     {/*        // variant="h4"*/}
//     {/*    >*/}
//     {/*        {contentOfNotepad || "content 없음!"}*/}
//     {/*    </Typography>*/}
//     {/*</Grid>*/}
//
//     <Grid
//         item
//     >
//         <Typography
//             component="p"
//             // variant="h4"
//         >
//             {notepadResponse.content || "content 없음!"}
//         </Typography>
//     </Grid>
//
//     <Grid
//         item
//     >
//
//
//         <Typography color="text.secondary" sx={{flex: 1}}>
//             {/*TODO Date 띄워보기*/}
//             {/*registered on {regDate}*/}
//             {/*registered on {typeof regDate}*/}
//         </Typography>
//         <Typography color="text.secondary" sx={{flex: 1}}>
//             <div>
//                 {
//                     '등록한 날짜 ' +
//                     (notepadResponse.regDate || '')
//                     // (regDate.toLocaleDateString() || '')
//                 }
//             </div>
//             <div>
//                 {
//                     '수정된 날짜 ' +
//                     (notepadResponse.chgDate || '')
//                     // (chgDate.toLocaleDateString() || '')
//                 }
//             </div>
//             {/*changed on {chgDate}*/}
//         </Typography>
//         <div>
//             <Button
//                 color="primary"
//                 variant={'outlined'}
//                 href={FRONT_URL.notepad.update(notepadSeq)}
//                 // onClick={handleUpdateOnclick}
//             >
//                 수정
//             </Button>
//             <Button
//                 color="primary"
//                 variant={"contained"}
//                 // href={FRONT_URL.notepad.detail(notepadSeq)}
//                 onClick={handleDeleteOnclick}
//             >
//                 삭제
//             </Button>
//         </div>
//     </Grid>
// </Grid>