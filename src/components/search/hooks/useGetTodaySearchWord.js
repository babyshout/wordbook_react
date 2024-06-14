import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";

export default function useGetTodaySearchWord() {


    const [todaySearchWord, setTodaySearchWord] = useState({})

    function getTodaySearchWord() {
        axios.get(
            serverUrl.word.search.getTodaySearchWord,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            setTodaySearchWord(response.data);
        }).catch(reason => {
            console.warn(reason)
        })
    }

    useEffect(() => {
        getTodaySearchWord();
    }, []);

    return [todaySearchWord]

}
