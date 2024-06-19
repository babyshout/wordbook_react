import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import * as React from "react";
import {FormContainer, TextFieldElement} from "react-hook-form-mui";
import axios from "axios";
import ServerUrl from "../../assets/enum/serverUrl.js";
import REQUEST_URL from "../../assets/enum/serverUrl.js";

const mockEmailVerificationCode = '123123'


/**
 * 전반적으로 더러운 회원가입 로직 처리.. 정리 필요
 * FIXME Redux 또는 useReducer 사용!
 * @
 * @returns {Element}
 * @constructor
 */
export default function SignupForm() {
    const [values, setValues] = React.useState([]);
    const [isEmailVerified, setIsEmailVerified] = React.useState(false);
    const [emailVerificationCode, setEmailVerificationCode] = React.useState('');
    const [isEmailVerificationCodeSent, setEmailVerificationCodeSent] = React.useState(false);

    const onSubmit = (data, event) => {
        event.preventDefault();
        setValues(data);
        console.log('data : ', data);
        console.log('event : ', event);
        console.log('emailVerificationCode : ', emailVerificationCode);
        console.log('data.emailVerificationCode', data.emailVerificationCode);

        console.log("data.emailVerificationCode typeof", typeof data.emailVerificationCode)

        if (!isEmailVerified && emailVerificationCode.code !== data.emailVerificationCode) {
            alert("이메일코드를 확인해주세요");
            document.getElementById('verification-code').focus();
            return
        }

        if (data.password !== data.passwordConfirm) {
            alert("비밀번호와 비밀번호 확인을 확인해주세요")
            return;
        }

        // if ()


        // TODO singup request here
        axios.post(REQUEST_URL.student.postSignup,
            JSON.stringify(data), {
                headers: {"Content-Type": "application/json",},
                withCredentials: true,
            }
        ).then(function (response) {
            console.log(response);
            // if (response.data.data.message.startsWith("Id 가 이미 있습니다!!")) {
            //     alert(response.data.data.message);
            //
            //     return;
            // }
            alert(response.data.data.message)
            location.href = "/login";
        }, function (reason) {
            console.log(reason)
            alert(reason.response.data.message);
        })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    const handleEmailVerificationCodeSending = (data) => {
        // TODO axios 작동 확인하기
        axios.post(REQUEST_URL.student.postGetEmailVerificationCode,
            JSON.stringify(data), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }

            }).then(res => {
            console.log(res)
            setEmailVerificationCode(res.data);

            if (res.data.isEmailExists) {
                setEmailVerificationCodeSent(false);
                alert("이메일이 이미 존재합니다");
                return;
            }

            alert("이메일 인증코드는 [" + res.data.code + "] 입니다.");
            setEmailVerificationCodeSent(true);
        }).catch(err => {
		console.log(err);
		alert("회원가입 실패..");
	})

        // TODO mock EmailVerificationCode 삭제하기
        // setEmailVerificationCode(mockEmailVerificationCode)
        console.log('emailVerificationCode ? ', emailVerificationCode);
        console.log('isEmailVerificationCodeSent ? ', isEmailVerificationCodeSent);
        console.log('emailVerificationCode ? ', emailVerificationCode);
    }

    /**
     * 이메일 인증 버튼 클릭 이벤트 핸들러
     * @param event 클릭 이벤트
     */
    const onSendEmailVerificationButton = (event) => {
        console.log('onSendEmailVerificationButton START!!!')
        console.log('event', event)
        const data = {
            email: document.getElementById("email").value,
        }
        console.log('email to send verification Code : ', data.email)

        if (data.email === '') {
            alert('Please enter a valid email address');
            return;
        }

        if (emailVerificationCode === '') {
            alert("이메일 인증코드가 발송되었습니다!")
            handleEmailVerificationCodeSending(data)
            return
        }
        if (confirm('다시 이메일 확인코드를 보내시겠습니까?')) {
            alert("이메일 인증코드가 재발송되었습니다!")
            handleEmailVerificationCodeSending(data)
            return
        }

    }

    const onEmailVerificationCodeChange = (event) => {
        console.log(event)
        if (isEmailVerificationCodeSent &&
            emailVerificationCode === event.target.value) {
            alert('email verification complete!!!');
            setIsEmailVerified(true);
        }
    }

    return (
        <Box
            sx={{mt: 3}}
        >
            <FormContainer
                // component="form"
                // noValidate
                onSuccess={onSubmit}
                onError={onError}
                onSubmit={(event) => event.preventDefault()}
            >
                <Grid container spacing={2}>


                    <Grid item xs={12}>
                        <TextFieldElement
                            autoComplete=""
                            name="studentId"
                            required
                            fullWidth
                            id="studentId"
                            label="Your ID"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldElement

                            autoComplete=""
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Your Name"
                        />
                    </Grid>
                    {/*이메일 시작*/}
                    <Grid item xs={12}>
                        <TextFieldElement
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextFieldElement
                            required
                            fullWidth
                            id="verification-code"
                            label="Email verification code"
                            name="emailVerificationCode"
                            autoComplete="email"
                            onChange={onEmailVerificationCodeChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            type={'button'}
                            fullWidth
                            id="sendEmailVerification"
                            name="sendEmailVerification"
                            onClick={onSendEmailVerificationButton}
                        >
                            email verification
                        </Button>
                    </Grid>
                    {/*이메일 끝*/}
                    <Grid item xs={12}>
                        <TextFieldElement
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldElement
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Password Confirm"
                            type="password"
                            id="passwordConfirm"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                        {/*    label="I want to receive inspiration, marketing promotions and updates via email."*/}
                        {/*/>*/}
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign Up
                </Button>
            </FormContainer>
            <HaveAccount
            />
        </Box>
    )
}

function HaveAccount(state) {

    return (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link href="/login" variant="body2">
                    Already have an account? Sign in
                </Link>
            </Grid>
        </Grid>
    )
}
