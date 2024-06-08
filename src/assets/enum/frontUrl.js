// const defaultBackServerURL = "http://localhost:11000";


const notepadDefault = "/notepad";

const mypageDefault = "/mypage"

const FRONT_URL = {

    hello_world: '/hello-world',
    login: '/login',
    signup: '/signup',
    default_app: '/default_app',
    forgot_login: '/forgot-login',

    // 데모들..
    demo: {
        button_group_click: '/demo/button-group-click-demo'
    },
    dashboard: "/dashboard",

    // 공부메모장..
    notepad: {
        list: notepadDefault + "/list",
        detail: (notepadSeq) => notepadDefault + `/${notepadSeq}`,
        write: notepadDefault + "/write",
        update: (notepadSeq) => notepadDefault + `/update/${notepadSeq}`,
    },

    // mypage!! 프로필..
    mypage: {
        info: mypageDefault + '/info',
        update: mypageDefault + '/update',
        delete: mypageDefault + '/deleteAccount',
        changePassword: mypageDefault + '/change-password',
    }
}

export default FRONT_URL