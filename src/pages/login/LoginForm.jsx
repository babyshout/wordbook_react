import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Stack} from '@mui/material'
import {useState} from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import REQUEST_URL from "../../assets/enum/serverUrl.js";
import axios from "axios";
import {useCookies} from "react-cookie";
import COOKIES from "../../assets/enum/cookies.js";


export default function LoginForm() {
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

        // TODO login request here
        axios.post(REQUEST_URL.student.postLogin,
            JSON.stringify(data), {
                headers: {"Content-Type": "application/json"},
            }).then(function (response) {
            console.log(response);
            alert(response.data.data.message)
            if (response.data.data.isLogin === true) {
                setCookie(COOKIES.loginInfo.name,
                    response.data.data, {
                        path: '/',

                    })
                location.href = "/";
            }
        })
    }

    const onError = (errors, event) => {
        console.log(errors, event);
    }


    return (
        <>
            <FormContainer
                defaultValues={{studentId: '123', password: ''}}
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
            <div>
                Data:
                <br/>
                {JSON.stringify(values)}
            </div>
        </>
    )
}