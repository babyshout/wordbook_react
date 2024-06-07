// const defaultBackServerURL = "http://localhost:11000";


const notepadDefault = "/notepad";

const FRONT_URL = {

    hello_world: '/hello-world',
    login: '/login',
    signup: '/signup',
    default_app: '/default_app',
    forgot_login: '/forgot-login',
    demo: {
        button_group_click: '/demo/button-group-click-demo'
    },
    dashboard: "/dashboard",
    notepad: {
        list: notepadDefault + "/list",
        detail: (notepadSeq) => notepadDefault + `/${notepadSeq}`,
        write: notepadDefault + "/write",
        update: (notepadSeq) => notepadDefault + `/update/${notepadSeq}`,
    },
}

export default FRONT_URL