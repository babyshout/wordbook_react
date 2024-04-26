import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [
    <Button key="one">One</Button>,
    <Button key="two">Two</Button>,
    <Button key="three">Three</Button>,
];

export default function ButtonGroupContainedWhenClickDemo() {
    const [selectedButton, setSelectedButton] = React.useState('one');
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup size="large" aria-label="Large button group">
                <Button
                    key="one"
                    id="one"
                    onClick={() => setSelectedButton('one')}
                    onClick={(event) => {
                        console.log(event);
                        setSelectedButton('one');
                    }}
                    variant={selectedButton === 'one' ? 'contained' : 'outlined'}
                >
                    One
                </Button>
                <Button
                    key="two"
                    id="two"
                    onClick={() => setSelectedButton('one')}
                    onClick={(event) => {
                        console.log(event);
                        setSelectedButton('two');
                    }}
                    variant={selectedButton === 'two' ? 'contained' : 'outlined'}
                >
                    Two
                </Button>
                <Button
                    key="three"
                    id="three"
                    onClick={(event) => {
                        console.log(event);
                        setSelectedButton('three');
                    }}
                    variant={selectedButton === 'three' ? 'contained' : 'outlined'}
                >
                    Three
                </Button>
            </ButtonGroup>
        </Box>
    );
}
