import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SideMenu from "../../components/menu/sidemenu/SideMenu.jsx";
import UpperAppBar from "../../components/menu/appbar/UpperAppBar.jsx";
import useOpenState from "../../components/menu/hooks/useOpenState.js";
import useLoginEffect from "../../components/menu/hooks/useLoginEffect.js";
import NotepadDetailMain from "../../components/notepad/main/NotepadDetailMain.jsx"
import SearchWordResultDetailMain from "../../components/search/detail/SearchWordResultDetailMain.jsx";



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// NOTE Dashboard 컴포넌트 시작!!!
export default function SearchWordResultDetailPage() {


    // useOpenState 생성..
    const [open, setOpen, toggleDrawer] = useOpenState();

    const [isLogin, loginSessionInfo, handleLogoutButton] = useLoginEffect();


    // console.log("loginSessionInfo -> ", loginSessionInfo);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                {/*맨위 AppBar 부분*/}
                <UpperAppBar
                    open={open}
                    toggleDrawer={toggleDrawer}
                    isLogin={isLogin}
                    handleLogoutButton={handleLogoutButton}
                    mainTitle={'공부메모장 상세보기'}
                />


                {/*NOTE 0604 SideMenu 컴포넌트 생성으로 기존 코드 삭제*/}
                {/*사이드 메뉴바!*/}
                <SideMenu toggleDrawer={toggleDrawer} open={open}/>

                {/*애만 가져와서 신경쓰면 됨..*/}
                <SearchWordResultDetailMain loginSessionInfo={loginSessionInfo}/>

            </Box>
        </ThemeProvider>
    );
}