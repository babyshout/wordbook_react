import {useEffect, useState} from "react";
import axios from "axios";
import REQUEST_URL from "../../../assets/enum/serverUrl.js";

export default  function useLoginEffect() {
    const [isLogin, setIsLogin] = useState(false)
    const [loginSessionInfo, setLoginSessionInfo] = useState({});
// login 정보 session 에서 가져옴
//     await
        useEffect(() => {
       // const value =  async () =>
       //  {
            async function getLoginSessionInfo() {
            const myValue =  await  axios.get(
                    REQUEST_URL.student.loginSessionInformation,
                    {
                        headers: "Content-Type: application/json",
                        withCredentials: true,
                    }
                ).then(function (response) {
                    console.log(response)
                    if (response.data !== null) {
                        setIsLogin(true)
                        setLoginSessionInfo(response.data);
                        return response.data;
                    }
                }).catch(reason => {
                    console.log(reason);
                    setIsLogin(false)
                    setLoginSessionInfo(null);
                    return null;
                })
                console.log("myValue -> ", myValue)
            }
            const value = getLoginSessionInfo()
            console.log("value -> ", value)
        // }
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

    return [isLogin, loginSessionInfo, handleLogoutButton];
}