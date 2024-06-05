import {useEffect, useState} from "react";
import axios from "axios";
import REQUEST_URL from "../../../assets/enum/serverUrl.js";

export default function useLoginEffect() {
    const [isLogin, setIsLogin] = useState(false)
// login 정보 session 에서 가져옴
    useEffect(() => {
        axios.get(
            REQUEST_URL.student.loginSessionInformation,
            {
                headers: "Content-Type: application/json",
                withCredentials: true,
            }
        ).then(function (response) {
            console.log(response)
            if (response.data !== null) {
                setIsLogin(true)
            }
        }).catch(reason => {
            console.log(reason);
            setIsLogin(false)
        })
    }, [isLogin])

// logout 버튼 핸들링!!!
    function handleLogoutButton(event) {
        console.log(event);
        axios.delete(REQUEST_URL.student.loginSessionInformation,
            {
                headers: "Content-Type: application/json",
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                setIsLogin(false);
            }, (reason) => {
                console.log(reason);
            })
    }

    return [isLogin, handleLogoutButton];
}