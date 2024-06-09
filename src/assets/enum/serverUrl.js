const defaultBackServerURL = "http://localhost:11000";

const notepad = "/api/notepads/v1"

const REQUEST_URL = {
    student: {
        // login, signup controller 와 연결됨
        postGetEmailVerificationCode: defaultBackServerURL + '/api/student/v1/signup/getVerificationCode',
        postLogin: defaultBackServerURL + '/api/student/v1/login/getLogin',
        postSignup: defaultBackServerURL + '/api/student/v1/signup/createStudent',

        // forgot-login 에서 사용..
        postForgotGetIdList: defaultBackServerURL + '/api/student/v1/forgot/get-id-list',
        postForgotResetPasswordForId: defaultBackServerURL + "/api/student/v1/forgot/reset-password-for-id",

        // login 이후.. session 에서 사용..
        getLoginSessionInformation: defaultBackServerURL + '/api/student/v1/login/getLoginSessionInformation',
        deleteLoginSessionInformation: defaultBackServerURL + '/api/student/v1/login/deleteLoginSessionInformation',
        loginSessionInformation: defaultBackServerURL + '/api/student/v1/login/loginSessionInformation',

        // mypage 에서 사용
        getStudentInfoBySession: defaultBackServerURL + '/api/student/v1/mypage/getStudentInfoBySession',
        postGetEmailAuthCode: defaultBackServerURL + '/api/student/v1/mypage/getEmailAuthCode',
        patchStudentInfo: defaultBackServerURL + '/api/student/v1/mypage/studentInfo',
        patchStudentPassword: defaultBackServerURL + '/api/student/v1/mypage/studentPassword',


    },

    // 공부메모장..
    notepad: {
        getNotepadList: defaultBackServerURL + notepad + "/notepad/getList",
        getNotepad: (notepadSeq) => defaultBackServerURL + notepad + "/notepad/" + notepadSeq,
        postCreateNotepad: defaultBackServerURL + notepad + "/notepad" + "/createNotepad",
        patchNotepad: (notepadSeq) => defaultBackServerURL + notepad + "/notepad/" + notepadSeq,
    }
}

export default REQUEST_URL