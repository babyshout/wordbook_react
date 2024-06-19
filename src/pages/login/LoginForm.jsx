import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Stack} from '@mui/material'
import {useState} from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import REQUEST_URL from "../../assets/enum/serverUrl.js";
import axios from "axios";
import {useCookies} from "react-cookie";
import COOKIES from "../../assets/enum/cookies.js";
import FRONT_URL from "../../assets/enum/frontUrl.js";
import naverOauth from "../../assets/enum/oauth/naverOauth.js";


export default function LoginForm() {
    const [values, setValues] = useState()
    /**
     * @link https://www.npmjs.com/package/react-cookie
     */
    const [cookies, setCookie, removeCookie] = useCookies()

    // const handleValueToValid = (value) => {
    //     value =
    // }

    const [studentIdValue, setStudentIdValue] = useState('')

    const onSubmit = (data, event) => {
        // event.preventDefault();
        console.log('Login Form submit START!!')
        console.log('event : ', event);
        setValues(data)
        console.log('data : ', data)


        // setCookie(COOKIES.loginInfo.name,
        //     "cookie test",
        //     {path: '/'})

        // TODO login request here
        axios.post(REQUEST_URL.student.postLogin,
            JSON.stringify(data), {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }).then(function (response) {
            console.log(response);
            if (response.data.data.isLogin === true) {
                alert("로그인 되었습니다!");
                // setCookie(COOKIES.loginInfo.name,
                //     response.data.data, {
                //         path: '/',
                //
                //     })

                sessionStorage.setItem("token", response.data.data.token);
                location.href = FRONT_URL.dashboard
                // "/";
            } else {
                alert("로그인 되지 않았습니다!");
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }

    let array = new Uint32Array(10)
    window.crypto.getRandomValues(array)

    // console.log('나의 행운의 숫자들:')
    // for (let i = 0; i < array.length; i++) {
    //     console.log(array[i])
    // }
    // console.log(array.toString());


    return (
        <>
            <FormContainer
                defaultValues={{studentId: '', password: ''}}
                onSuccess={onSubmit}
                onError={onError}

            >
                <Stack direction={'column'}>
                    <TextFieldElement
                        margin={'normal'}
                        required
                        fullWidth
                        id={'studentId'}
                        label={'ID'}
                        name={'studentId'}
                        autoComplete="email"
                        autoFocus
                        value={studentIdValue}
                        onChange={(event) => {
                            console.log(event);
                            console.log(event.target.value)
                            console.log(studentIdValue)
                            event.target.value = event.target.value
                                .replace(/[\W]/, '');
                            setStudentIdValue(studentIdValue
                                .replace(/[\W]/, ''))
                            setStudentIdValue(event.target.value
                                .replace(/[\W]/, ''))
                        }}
                    />
                    <TextFieldElement
                        color={'primary'}
                        margin={'normal'}
                        required
                        fullWidth
                        name={'password'}
                        label={'Password'}
                        type={'password'}
                        id={'password'}
                        autoComplete={'current-password'}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type={'submit'}
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        sx={{mt: 3, mb: 2}}
                    >
                        Submit
                    </Button>
                </Stack>
            </FormContainer>
            <Button
                color={"success"}
                variant={'contained'}
                href={naverOauth.create_authorize_URL(array[0])}
            >
                네이버로그인
            </Button>
        </>
    )
}
