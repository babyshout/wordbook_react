import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SideMenu from "../../components/menu/sidemenu/SideMenu.jsx";
import UpperAppBar from "../../components/menu/appbar/UpperAppBar.jsx";
import useOpenState from "../../components/menu/hooks/useOpenState.js";
import useLoginEffect from "../../components/menu/hooks/useLoginEffect.js";
import NotepadListMain from "../../components/notepad/main/NotepadListMain.jsx";
import SearchDashboardMain from "../../components/search/dashboard/SearchDashboardMain.jsx";
import {useEffect} from "react";



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// NOTE Dashboard 컴포넌트 시작!!!
export default function SearchDashboardPage() {


    // useOpenState 생성..
    const [open, setOpen, toggleDrawer] = useOpenState();

    const [isLogin, loginSessionInfo, handleLogoutButton] = useLoginEffect();


    console.log("loginSessionInfo -> ", loginSessionInfo);

    useEffect(() => {
    console.log('123123');

    }, []);



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
                    mainTitle={'단어검색 (대시보드)'}
                />


                {/*NOTE 0604 SideMenu 컴포넌트 생성으로 기존 코드 삭제*/}
                {/*사이드 메뉴바!*/}
                <SideMenu toggleDrawer={toggleDrawer} open={open}/>

                {/*애만 가져와서 신경쓰면 됨..*/}
                <SearchDashboardMain loginSessionInfo={loginSessionInfo}/>

            </Box>
        </ThemeProvider>
    );
}
