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
import {FormContainer} from "react-hook-form-mui";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function MyPageUpdate({
                                         // notepadResponse = {
                                         //     notepadSeq: 1,
                                         //     content: '123',
                                         //     regDate: new Date(),
                                         //     chgDate: new Date(),
                                         // }
                                     }) {


    // TODO mock~~ 지우기
    const [userName, setUserName] = useState('mockName')
    const [userEmail, setUserEmail] = useState('mockEmail')
    const [userEmailAuth, setUserEmailAuth] = useState('mockEmailAuth')
    const [userEmailAuthCodeByServer, setUserEmailAuthCodeByServer] = useState('')
    const [isEmailAuthSent, setIsEmailAuthSent] = useState(false)

    const [studentInfoBySession, setStudentInfoBySession] = useState({})

    console.log('userName -> ', userName)
    console.log('userEmail -> ', userEmail)
    console.log('userEmailAuth -> ', userEmailAuth)
    console.log('userEmailAuthCodeByServer -> ', userEmailAuthCodeByServer)
    console.log('isEmailAuthSent -> ', isEmailAuthSent)
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

            setUserName(data.name)
            setUserEmail(data.email)
            setStudentInfoBySession(data)

        }).catch(reason => {
            console.log(reason)
        })
    }, []);


    const handleSubmitButton = (event) => {
        event.preventDefault()
        console.log(event);

        if (userName == '') {
            alert('이름이 비어있음!!')
            event.target.name.focus()
            return
        }
        if (userEmail == '') {
            alert('이메일이 비어있음!!')
            event.target.email.focus()
            return
        }

        console.log('userEmailAuth.toString() -> ', userEmailAuth.toString());
        console.log('userEmailAuthCodeByServer.toString() -> ', userEmailAuthCodeByServer.toString())
        console.log(userEmailAuth.toString() === userEmailAuthCodeByServer.toString())
        if (userEmailAuth.toString() !== userEmailAuthCodeByServer.toString()) {
            alert("인증번호 불일치!")
            return;
        }

        const data = {
            name: userName,
            email: userEmail,
            emailAuthCode: userEmailAuth,
            emailAuthCodeByServer: userEmailAuthCodeByServer
        }

        console.log('data to server -> ', data)

        axios.patch(
            serverUrl.student.patchStudentInfo,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            alert("회원정보 수정 성공")
        }).catch(reason => {
            console.log(reason)
            alert("업데이트 실패..!")
        })
    }

    const handleEmailAuthSendButton = (event) => {
        console.log(event);
        const data = {email: userEmail}

        axios.post(
            serverUrl.student.postGetEmailAuthCode,
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            const data = response.data;
            setUserEmailAuthCodeByServer(data.authCode)
            setIsEmailAuthSent(true)
            console.log('userEmailAuthCodeByServer -> ', userEmailAuthCodeByServer)
            console.log('isEmailAuthSent -> ', isEmailAuthSent)

        }).catch(reason => {
            console.log(reason)
            alert("이메일 인증번호 전송 실패!")
        })
    }


    return (

        <form onSubmit={handleSubmitButton}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {/*<FormContainer onSubmit={handleSubmitButton}>*/}

                <TextField
                    // disabled
                    name={"name"}
                    id={"name"}
                    label={"이름"}
                    fullWidth
                    autoFocus
                    value={userName}
                    onChange={(evt) => {
                        setUserName(evt.target.value)
                    }}
                />
                <TextField
                    // disabled
                    name={"email"}
                    id={"email"}
                    label={"이메일"}
                    fullWidth
                    autoFocus
                    value={userEmail}
                    onChange={(evt) => {
                        setUserEmail(evt.target.value)
                    }}
                />
                <Divider
                    sx={{my: 2}}
                />
                <Stack
                    direction="row"
                    spacing={2}
                    flexGrow={1}
                >
                    <TextField
                        // disabled
                        name={"emailAuth"}
                        id={"emailAuth"}
                        label={"이메일 인증번호"}
                        type={"number"}
                        fullWidth
                        autoFocus
                        value={userEmailAuth}
                        onChange={(evt) => {
                            setUserEmailAuth(evt.target.value)
                            // if (userEmailAuth.toString() === userEmailAuthCodeByServer.toString()) {
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
                        onClick={handleEmailAuthSendButton}
                        type="button"
                    >
                        이메일 인증번호 보내기
                    </Button>

                </Stack>

                <Button
                    // sx={{
                    //     width: '100vw'
                    // }}
                    // href={frontUrl.mypage.update}
                    variant="contained"
                    type={"submit"}
                >
                    회원정보 수정확인
                </Button>
                {/*</FormContainer>*/}


                <Divider/>
                <Button
                    // sx={{
                    //     width: '100vw'
                    // }}
                    href={frontUrl.mypage.changePassword}
                    variant="contained"
                    type={"button"}

                >
                    비밀번호 변경하기
                </Button>

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