import Typography from "@mui/material/Typography";
import React from "react";

export default function StudentDateTypographyForMypage({studentInfoBySession}) {

    return (
        <React.Fragment>

            <Typography
            >
                {studentInfoBySession ?
                    '가입일 : ' + studentInfoBySession.regDate :
                    ''}
            </Typography>
            <Typography
            >
                {studentInfoBySession ?
                    '회원정보 수정일 : ' + studentInfoBySession.changerDate :
                    ''}
            </Typography>
        </React.Fragment>
    )
}