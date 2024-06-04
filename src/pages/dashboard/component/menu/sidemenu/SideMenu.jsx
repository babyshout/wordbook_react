import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {mainListItems} from "./listItems.jsx";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {drawerWidth} from "../Constants.js";




// NOTE 왼쪽 메뉴 바
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            // NOTE 왜인지는 모르나.. 원래 코드에는 relative 가 활성화 되어있지만,
            // 비활성화 하니 레이아웃이 제대로 보임
            // position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// SideMenu.proptTypes = {
//     toggleDrawer: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
// }

export default function SideMenu({toggleDrawer, open}) {
    return(
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
                {mainListItems}
                <Divider sx={{my: 1}}/>
                {/*{secondaryListItems}*/}
            </List>
        </Drawer>
    )
}