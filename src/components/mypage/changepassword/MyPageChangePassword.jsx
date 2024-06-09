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

export default function MyPageChangePassword({
                                         // notepadResponse = {
                                         //     notepadSeq: 1,
                                         //     content: '123',
                                         //     regDate: new Date(),
                                         //     chgDate: new Date(),
                                         // }
                                     }) {


    const [nowPassword, setNowPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

    const [studentInfoBySession, setStudentInfoBySession] = useState({})

    console.log('nowPassword -> ', nowPassword)
    console.log('newPassword -> ', newPassword)
    console.log('newPasswordConfirm -> ', newPasswordConfirm)
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
        if (newPassword === '') {
            alert('새 비밀번호가 비어있음!!')
            event.target.newPassword.focus()
            return
        }
        if (newPasswordConfirm === '') {
            alert('비밀번호 확인이 비어있음!!')
            event.target.newPasswordConfirm.focus()
            return
        }



        const data = {
            nowPassword: nowPassword,
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm,
        }

        console.log('data to server -> ', data)

        axios.patch(
            serverUrl.student.patchStudentPassword,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            alert("비밀번호 수정 성공")
            location.href = frontUrl.mypage.info;
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
                <Divider
                    sx={{my: 2}}
                />
                <TextField
                    required
                    name={"newPassword"}
                    id={"newPassword"}
                    label={"새 비밀번호"}
                    type={"password"}
                    fullWidth
                    value={newPassword}
                    onChange={(evt) => {
                        setNewPassword(evt.target.value)
                    }}
                />
                    <TextField
                        required
                        name={"newPasswordConfirm"}
                        id={"newPasswordConfirm"}
                        label={"새 비밀번호 확인"}
                        type={"password"}
                        fullWidth
                        value={newPasswordConfirm}
                        onChange={(evt) => {
                            setNewPasswordConfirm(evt.target.value)
                            // if (newPasswordConfirm.toString() === userEmailAuthCodeByServer.toString()) {
                            //     alert("인증번호 일치!")
                            // }
                        }}
                    />

                <Button
                    // sx={{
                    //     width: '100vw'
                    // }}
                    // href={frontUrl.mypage.update}
                    variant="contained"
                    type={"submit"}
                >
                    비밀번호 변경하기
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