const defaultBackServerURL = "http://localhost:11000";

const REQUEST_URL = {
    student: {
        // login, signup controller 와 연결됨
        postGetEmailVerificationCode: defaultBackServerURL + '/api/student/v1/signup/getVerificationCode',
        postLogin: defaultBackServerURL + '/api/student/v1/login/getLogin',
        postSignup: defaultBackServerURL + '/api/student/v1/signup/createStudent',

        postForgotGetIdList: defaultBackServerURL + '/api/student/v1/forgot/get-id-list',
        postForgotResetPasswordForId: defaultBackServerURL + "/api/student/v1/forgot/reset-password-for-id",

        getLoginSessionInformation: defaultBackServerURL + '/api/student/v1/login/getLoginSessionInformation',
        deleteLoginSessionInformation: defaultBackServerURL + '/api/student/v1/login/deleteLoginSessionInformation',
        loginSessionInformation: defaultBackServerURL + '/api/student/v1/login/loginSessionInformation',

    }
}

export default REQUEST_URL