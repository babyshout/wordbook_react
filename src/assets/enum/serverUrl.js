const defaultBackServerURL = "http://localhost:11000";

const REQUEST_URL = {
    student: {
        getEmailVerificationCode: defaultBackServerURL + '/api/student/v1/signup/getVerificationCode',
        postLogin: defaultBackServerURL + '/api/student/v1/login/getLogin',
        postSignup: defaultBackServerURL + '/api/student/v1/signup/createStudent',
        postForgotGetIdList: defaultBackServerURL + '/api/student/v1/forgot/get-id-list',
    }
}

export default REQUEST_URL