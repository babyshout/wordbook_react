import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart.jsx";
import Deposits from "./Deposits.jsx";
import Orders from "./Orders.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function MainExample() {
    return (
        <Box
        component="main"
        sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '90vh',
            overflow: 'auto',
            // width: `${windowWidth}px`,
            width: '90vw',
            display: 'flex',          // Ensure the Box uses flex display
            flexDirection: 'column',  // Arrange children in a column
            // height: '100vh',          // Full viewport height
            // overflow: 'auto',
        }}
    >
        <Toolbar/>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Chart/>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                {/*<Grid item xs={12} md={4} lg={3}>*/}
                {/*    <Paper*/}
                {/*        sx={{*/}
                {/*            p: 2,*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            height: 240,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <Deposits/>*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Deposits/>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Orders/>
                    </Paper>
                </Grid>
            </Grid>

            {/*맨 아래 카피라이트 부분*/}
            <Copyright sx={{pt: 4}}/>
        </Container>
    </Box>)
}