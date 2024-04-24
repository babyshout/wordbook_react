import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {Button, Stack} from '@mui/material'
import {useState} from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


export default function LoginForm() {
    const [values, setValues] = useState()
    const onSubmit = (data, event) => {
        event.preventDefault();
        setValues(data)
        console.log(data)

        // TODO login request here
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