// FIXME 기존에 notepadList 레이아웃 사용해서.. 레이아웃 확인만 보고 나중에 지울것
import React, {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";
import frontUrl from "../../../assets/enum/frontUrl.js";

export default function useHandleSearchBar() {

    const [searchValue, setSearchValue] = React.useState(
        // options[0]
        ''
    );
    const [searchInputValue, setSearchInputValue] = React.useState('');


    /**
     * searchWordButton 클릭 이벤트 핸들링용 함수
     * @param event
     */
    function handleSearchWordButtonOnClick(event) {
        event.preventDefault()
        console.log(event);
        alert("searchWordButton 클릭됨!!")

        if (!searchInputValue) {
            alert("검색할 단어가 비어있습니다")
            document.getElementById('search-word-field').focus()
            return;
        }

        axios.get(
            serverUrl.word.search.getWordErrataCheck(searchInputValue),
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            },
        ).then(response => {
            console.log(response)
            const data = response.data

            if (!data) {
                alert("오타 없는거로 확인됨")
                location.href = frontUrl.searchWord.result(searchInputValue)
                return
            }
            alert('오타확인.. [' + data + '] 결과 반환..')
            setSearchInputValue(data)
        }).catch(reason => {
            console.log(reason)
            alert(reason.response.data.message)
        })
    }

    function handleWordErrataCheckButton(event) {
        event.preventDefault()
        console.log(event);
        alert("handleWordErrataCheckButton 클릭됨!!")

        if (!searchInputValue) {
            alert("검색할 단어가 비어있습니다")
            document.getElementById('search-word-field').focus()
            return;
        }
        console.log(searchInputValue)

        axios.get(
            serverUrl.word.search.getWordErrataCheck(searchInputValue),
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            },
        ).then(response => {
            console.log(response)
            const data = response.data

            if (!data) {
                alert("오타 없는거로 확인됨")
                return
            }
            alert('오타확인.. [' + data + '] 결과 반환..')
            setSearchInputValue(data)
        }).catch(reason => {
            console.log(reason)
            alert(reason.response.data.message)
        })
    }

    return [
        searchValue,
        setSearchValue,
        searchInputValue,
        setSearchInputValue,
        handleSearchWordButtonOnClick,
        handleWordErrataCheckButton
    ];
}
