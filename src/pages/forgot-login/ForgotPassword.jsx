import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Stack} from '@mui/material'
import {useState} from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import REQUEST_URL from "../../assets/enum/serverUrl.js";
import axios from "axios";
import {useCookies} from "react-cookie";
import COOKIES from "../../assets/enum/cookies.js";


/**
 * TODO 레이아웃 확인하고, 로직 삽입하기
 * @returns {JSX.Element}
 * @constructor
 */
export default function ForgotPassword() {
    const [values, setValues] = useState()
    /**
     * @link https://www.npmjs.com/package/react-cookie
     */
    const [cookies, setCookie, removeCookie] = useCookies()

    const onSubmit = (data, event) => {
        // event.preventDefault();
        console.log('Login Form submit START!!')
        console.log('event : ', event);
        setValues(data)
        console.log('data : ', data)
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if(!email_regex.test(data.email)){ 
            alert("유효하지 않은 이메일 입니다..")
            return
        }

        // TODO login request here
        axios.post(REQUEST_URL.student.postForgotResetPasswordForId,
            JSON.stringify(data), {
                headers: {"Content-Type": "application/json"},
            }).then(function (response) {
            console.log(response);
            alert(response.data.message);

            if (response.data.isSueccess === true) {
                alert(response.data.message);
            }
        }).catch(reason => {
            console.warn(reason);
            alert("실패!!!!");
        })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }


    return (
        <>
            <FormContainer
                // defaultValues={{studentId: '123', password: ''}}
                onSuccess={onSubmit}
                onError={onError}
            >
                <Stack direction={'column'}>
                    <TextFieldElement
                        margin={'normal'}
                        required
                        fullWidth
                        id={'studentId'}
                        label={'아이디'}
                        name={'studentId'}
                        autoComplete="id"
                        autoFocus
                    />
                    <TextFieldElement
                        margin={'normal'}
                        required
                        fullWidth
                        id={'name'}
                        label={'이름'}
                        name={'name'}
                        autoComplete="name"
                    />
                    <TextFieldElement
                        color={'primary'}
                        margin={'normal'}
                        required
                        fullWidth
                        name={'email'}
                        label={'이메일'}
                        type={'email'}
                        id={'email'}
                        // autoComplete={''}
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
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
        </>
    )
}
