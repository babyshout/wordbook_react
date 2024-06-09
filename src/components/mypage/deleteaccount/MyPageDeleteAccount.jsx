import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "/src/assets/enum/serverUrl.js";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import frontUrl from "/src/assets/enum/frontUrl.js";
import Link from "@mui/material/Link";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function MyPageDeleteAccount({
                                                 // notepadResponse = {
                                                 //     notepadSeq: 1,
                                                 //     content: '123',
                                                 //     regDate: new Date(),
                                                 //     chgDate: new Date(),
                                                 // }
                                             }) {


    const [nowPassword, setNowPassword] = useState('')

    const [deleteConfirmMessage, setDeleteConfirmMessage] = useState('')

    const [studentInfoBySession, setStudentInfoBySession] = useState({})

    console.log('nowPassword -> ', nowPassword)
    console.log('studentInfoBySession -> ', studentInfoBySession)

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

            setStudentInfoBySession(data)

        }).catch(reason => {
            console.log(reason)
        })
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event);

        if (nowPassword === '') {
            alert('현재 비밀번호가 비어있음!!')
            event.target.nowPassword.focus()
            return
        }

        if (deleteConfirmMessage !== '탈퇴하겠습니다') {
            alert("탈퇴확인 메세지가 제대로 되어있지 않음!!")
            event.target.deleteConfirmMessage.focus()
            return;
        }



        const data = {
            nowPassword: nowPassword,
            deleteConfirmMessage: deleteConfirmMessage,
        }

        console.log('data to server -> ', data)

        axios.post(
            serverUrl.student.postDeleteStudentAccount,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            alert("회원탈퇴 성공")
            location.href = frontUrl.login;
        }).catch(reason => {
            console.log(reason)
            alert("업데이트 실패..!")
            alert(reason.response.data.message)
            // alert(reason.)
        })
    }


    return (

        <form onSubmit={handleSubmit}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {/*<FormContainer onSubmit={handleSubmit}>*/}

                <Typography>
                    정말 탈퇴하시겠습니까?

                    탈퇴하시면 회원님과 관련된 모든 개인정보가 파기됩니다.
                    동의하시면 아래 입력칸에 &quot;탈퇴하겠습니다&quot;를 입력 후, 회원탈퇴 하기 버튼을 클릭해 주세요.

                </Typography>
                <TextField
                    // disabled
                    required
                    name={"deleteConfirmMessage"}
                    id={"deleteConfirmMessage"}
                    label={"탈퇴 확인"}
                    type={"text"}
                    fullWidth
                    autoFocus
                    value={deleteConfirmMessage}
                    onChange={(evt) => {
                        setDeleteConfirmMessage(evt.target.value)
                    }}
                />
                <Divider
                    sx={{my: 2}}
                />
                <TextField
                    // disabled
                    required
                    name={"nowPassword"}
                    id={"nowPassword"}
                    label={"현재 비밀번호"}
                    type={"password"}
                    fullWidth
                    autoFocus
                    value={nowPassword}
                    onChange={(evt) => {
                        setNowPassword(evt.target.value)
                    }}
                />

                <Button
                    // sx={{
                    //     width: '100vw'
                    // }}
                    // href={frontUrl.mypage.update}
                    variant="outlined"
                    type={"submit"}
                >
                    탈퇴하기
                </Button>


                <Divider/>

                <Link
                    href={frontUrl.mypage.delete}
                >
                    회원탈퇴
                </Link>
                <Divider/>
                <Typography
                >
                    {'가입일 : ' + studentInfoBySession.regDate || ''}
                </Typography>
                <Typography
                >
                    {'회원정보 수정일 : ' + studentInfoBySession.changerDate || ''}
                </Typography>
            </Stack>

        </form>

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