import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "/src/assets/enum/serverUrl.js";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import frontUrl from "/src/assets/enum/frontUrl.js";
import Link from "@mui/material/Link";
import StudentDateTypographyForMypage from "../StudentDateTypographyForMypage.jsx";

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function MyPageUpdate() {


    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userEmailAuth, setUserEmailAuth] = useState('')
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

        if (!isEmailAuthSent) {
            alert("이메일 인증번호를 받아주세요")
            event.target.emailAuth.focus()
            return
        }

        // event.target.email.

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
            location.href = frontUrl.mypage.info;
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
            alert(`이메일 인증번호는 ${data.authCode} 입니다!`)
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
                    required
                    name={"name"}
                    id={"name"}
                    label={"이름"}
                    type={"text"}
                    fullWidth
                    autoFocus
                    value={userName}
                    onChange={(evt) => {
                        setUserName(evt.target.value)
                    }}
                />
                <TextField
                    required
                    name={"email"}
                    id={"email"}
                    type={"email"}
                    label={"이메일"}
                    fullWidth
                    autoFocus
                    value={userEmail}
                    // inputProps={{
                    //     pattern: /email@email.com/
                    // }}
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
                    sx={{
                        width: '100%'
                    }}
                >
                    <TextField
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

                <Divider/>
                <StudentDateTypographyForMypage
                    studentInfoBySession={studentInfoBySession}
                />
                <Link
                    href={frontUrl.mypage.delete}
                >
                    회원탈퇴
                </Link>

            </Stack>

        </form>

    );
}

