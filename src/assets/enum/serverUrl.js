const defaultBackServerURL = "http://localhost:11000";

const REQUEST_URL = {
    student: {
        getEmailVerificationCode: defaultBackServerURL + '/api/student/v1/signup/getVerificationCode',
        postLogin: defaultBackServerURL + '/api/student/v1/login/getLogin',
        postSignup: defaultBackServerURL + '/api/student/v1/signup/createStudent',
        postForgotGetIdList: defaultBackServerURL + '/api/student/v1/forgot/get-id-list',
        getLoginSessionInformation: defaultBackServerURL + '/api/student/v1/login/getLoginSessionInformation',
        deleteLoginSessionInformation: defaultBackServerURL + '/api/student/v1/login/deleteLoginSessionInformation',
        loginSessionInformation: defaultBackServerURL + '/api/student/v1/login/loginSessionInformation',


    }
}

export default REQUEST_URL