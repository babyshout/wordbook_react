import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FRONT_URL from "../../../assets/enum/frontUrl.js";
import {CalendarMonth, Face} from "@mui/icons-material";
// import Link from "@mui/material/Link";

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href={FRONT_URL.dashboard}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="메인화면"/>
        </ListItemButton>

        <ListItemButton href={FRONT_URL.notepad.list}>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="공부 메모장"/>
{/*            <ListItemText primary={FRONT_URL.notepad.list}/>
*/}        </ListItemButton>

        <ListItemButton href={FRONT_URL.searchWord.dashboard}>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="단어검색"/>
        </ListItemButton>

        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <PeopleIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="단어연습"/>*/}
        {/*</ListItemButton>*/}

        <ListItemButton href={FRONT_URL.myword.dashboard}>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="단어장"/>
        </ListItemButton>

        <ListItemButton href={FRONT_URL.calendar.main}>
            <ListItemIcon>
                <CalendarMonth/>
            </ListItemIcon>
            <ListItemText primary="달력"/>
        </ListItemButton>

        <ListItemButton href={FRONT_URL.mypage.info}>
            <ListItemIcon>
                <Face />
            </ListItemIcon>
            <ListItemText primary={'마이페이지'} />
{/*            <ListItemText primary={FRONT_URL.mypage.info} />
*/}        </ListItemButton>

    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItemButton>
    </React.Fragment>
);
