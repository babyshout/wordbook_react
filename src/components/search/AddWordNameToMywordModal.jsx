import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import serverUrl from "../../assets/enum/serverUrl.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function AddMyword({setSimpleMywordList}) {
    const [open, setOpen] = React.useState(false);

    const [newMywordName, setNewMywordName] = useState('')
    const handleOpen = () => {
        setOpen(true);
    };
    const handleAddNewMywordButton = (event) => {
        console.log(event)

        const data = {
            newMywordName: newMywordName,
        }
        console.log('data -> ', data);
        axios.post(
            serverUrl.word.myword.postAddNewMyword,
            data,
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            alert("단어장이 추가됐습니다!!")
            setOpen(false);
            setSimpleMywordList(response.data);
        }).catch(reason => {
            console.warn(reason)
            alert(reason.response.data.message);
        })
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>단어장 추가하기</Button>
            <Modal
                open={open}
                onClose={handleAddNewMywordButton}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 200}}>
                    {/*<h2 id="child-modal-title">Text in a child modal</h2>*/}
                    {/*<p id="child-modal-description">*/}
                    {/*    Lorem ipsum, dolor sit amet consectetur adipisicing elit.*/}
                    {/*</p>*/}
                    <TextField
                        id={'newMywordName'}
                        label={'추가할 단어장 이름'}
                        name={'newMywordName'}
                        value={newMywordName}
                        onChange={(event) => {
                            setNewMywordName(event.target.value)
                            // console.log(newMywordName)
                        }}
                    >
                        123
                    </TextField>
                    <Button

                        onClick={handleAddNewMywordButton}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function AddWordNameToMywordModal({wordName = '주식'}) {
    const [open, setOpen] = React.useState(false);

    const [simpleMywordList, setSimpleMywordList] = useState([])

    useEffect(() => {
        axios.get(
            serverUrl.word.myword.getSimpleMywordList,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            setSimpleMywordList(response.data);
        }).catch(reason => {
            console.warn(reason)
            alert("단어장 리스트 가져오기 실패..!")
        })
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const postWordNameToMyword = (wordName, mywordName) => {
        // console.log('wordName -> ', wordName);
        // console.log('mywordName -> ', mywordName);
        if (mywordName === "RECENTLY_SEARCH" &&
            !confirm("해당 단어장은 최근검색 단어장입니다. 이미 추가되어있을 가능성이 높습니다! 정말 추가하시겠습니까?")) {
            console.log("최근검색 단어장에 추가하려 했으나, 취소함")
            return;
        }

        const data = {
            wordName: wordName,
            mywordName: mywordName,
        }

        console.log('data -> ', data)
        axios.post(
            serverUrl.word.myword.postWordNameToMyword,
            data,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then(response => {
            console.log(response)
            alert(`${mywordName} 단어장에 [${wordName}] 추가 성공!!`)
            handleClose();
        }).catch(reason => {
            console.warn(reason)
            alert(`${mywordName} 단어장에 [${wordName}] 추가 실패..`)
        })
    }

    return (
        <div>
            <Button
                variant={'contained'}
                onClick={handleOpen}>단어 추가</Button>
            <Modal
                open={open}
                onClose={handleClose}
                keepMounted
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    {simpleMywordList.map((item, index) => (
                        <Button
                            name={item.mywordName}
                            key={item.mywordName}
                            onClick={(event) => {
                                console.log(event)
                                postWordNameToMyword(wordName, item.mywordName)
                            }}>{item.mywordName}</Button>
                    ))}
                    {/*<h2 id="parent-modal-title">Text in a modal</h2>*/}
                    {/*<p id="parent-modal-description">*/}
                    {/*    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
                    {/*</p>*/}
                    <h3>추가될 단어 -> {wordName || ''}</h3>
                    <AddMyword setSimpleMywordList={setSimpleMywordList}/>
                </Box>
            </Modal>
        </div>
    );
}