import {useSearchParams} from "react-router-dom";
import frontUrl from "../../../assets/enum/frontUrl.js";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";


export default function NaverOauthCallbackPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);

    const asdQueryParam = searchParams.get('asd')
    console.log(asdQueryParam);

    const code = searchParams.get('code')
    const state = searchParams.get('state')

    console.log('code -> ', code)
    console.log('state -> ', state)

    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')

    if (error) {
        alert("네이버로그인 실패..!")
        alert("error -> " + error + "\nerror_description -> " + error_description);
        location.href = frontUrl.login;
    }

    const requestUrl = serverUrl.student.naver.postGetSocialLogin;
    console.log("requestUrl -> ", requestUrl)

    const data = {
        code: code,
        state: state,
    }

    console.log('data -> ', data)

    axios.post(
        requestUrl,
        JSON.stringify(data),
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }
    ).then((response) => {
        console.log(response);
        alert("네이버 로그인 성공")
        // fixme 지우고 원하는데로 보내기
        // location.href = frontUrl.login;
    }).catch((reason) => {
        console.log(reason);

        alert("네이버 로그인 실패..")
        // fixme 지우고 원하는데로 보내기
        // location.href = frontUrl.login;
    })


    return (
        <div>
            naver Oauth callback 실행중..
        </div>
    )
}