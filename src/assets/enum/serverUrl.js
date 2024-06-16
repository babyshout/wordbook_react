const defaultBackServerURL = "http://localhost:11000";
// FIXME 배포시.. 서버URL 관련 확인요망
// const defaultBackServerURL = "http://localhost:11000";

const notepad = "/api/notepads/v1"

const word = "/api/words/v1"
const search = "/search"
const myword = '/myword'

const problemOfWord = "/problem-of-word"

const calendar = "/api/calendar/v1";

const dashboard = "/api/dashboard/v1";
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
        postDeleteStudentAccount: defaultBackServerURL + '/api/student/v1/mypage/deleteStudentAccount',


        // 네이버 로그인시 사용
        naver: {
            postGetSocialLogin: defaultBackServerURL + '/api/student/v1/naver/getSocialLogin'
        }
    },

    // 공부메모장..
    notepad: {
        getNotepadList: defaultBackServerURL + notepad + "/notepad/getList",
        getNotepad: (notepadSeq) => defaultBackServerURL + notepad + "/notepad/" + notepadSeq,
        postCreateNotepad: defaultBackServerURL + notepad + "/notepad" + "/createNotepad",
        patchNotepad: (notepadSeq) => defaultBackServerURL + notepad + "/notepad/" + notepadSeq,
    },
    // 단어 관련..
    word: {

        // 단어 검색..
        search: {
            getRecentlySearchWord:
                defaultBackServerURL + word + search + "/searchRecentlySearchWord",
            getWordErrataCheck: (wordName) =>
                defaultBackServerURL + word + search + "/wordErrataCheck?wordName=" + wordName,
            // getSearchWord: (wordNameParam) => {
            //     return defaultBackServerURL + word + search + "/getSearchWord";
            // }
            postGetSearchSimpleWordList: defaultBackServerURL + word + search + "/getSearchSimpleWordList",

            getTodaySearchWord: defaultBackServerURL + word + search + "/todaySearchWord",
            getSearchWordDetail: (wordNameParam) =>
                defaultBackServerURL + word + search + `/searchSearch/${wordNameParam}`,

        },

        // 단어장 관련..
        myword: {
            // 새로운 myword 추가..
            postAddNewMyword: defaultBackServerURL + word + myword + "/addNewMyword",
            getSimpleMywordList: defaultBackServerURL + word + myword + "/list/simple",
            postWordNameToMyword: defaultBackServerURL + word + myword + "/wordNameToMyword",
            getMywordList: defaultBackServerURL + word + myword + "/list",
            getMywordDetail:
                (mywordNameParam) => defaultBackServerURL + word + myword +
                    "/detail?mywordName=" + mywordNameParam,
        },

        // 문제 관련
        problemOfWord: {
            postRandomWordDocumentToSolveResult:
                defaultBackServerURL + word + problemOfWord + "/randomWordDocument/toSolveResult",
            getRandomWordDocumentToSolve: (mywordNameParam) =>
                defaultBackServerURL + word + problemOfWord + "/randomWordDocument/toSolve?mywordName=" + mywordNameParam,
        },
    },

    // fullcalendar 사용 관련
    calendar: {
        getScheduleList: defaultBackServerURL + calendar + "/scheduleList",
        postSchedule: defaultBackServerURL + calendar + "/schedule",
        deleteSchedule: (id) => defaultBackServerURL + calendar + "/schedule?id=" + id,
    },

    // dashboard 관련 요청들 (메인페이지)
    dashboard: {
        getRecentlyNotepadList: (amount) =>
            defaultBackServerURL + dashboard + `/notepad/list?amount=${amount}`,
        // getRecentlySearchWordDetail:
        //     defaultBackServerURL + word + myword +
        //     "/detail?mywordName=RECENTLY_SEARCH",

    }
}

export default REQUEST_URL