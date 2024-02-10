import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import Item from './Item';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                
                <Box
                    sx={{
                        bgcolor: 'background.default',
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="h2" gutterBottom color={'white'}>
                        Choose Spells
                    </Typography>
                    <Item text={'All The Spells'} fileName={'spells-all.json'} />
                    <Item text={'Player\'s handbook'} fileName={'spells-srd.json'} />
                    <Item text={'Xanathar\'s Guide to Everything'} fileName={'spells-xge.json'} />
                    <Item text={'Guildmaster\'s Guide to Ravnica'} fileName={'spells-ggr.json'} />
                    <Item text={'Acquisitions Incorporated'} fileName={'spells-ai.json'} />
                    <Item text={'Explorer\'s Guide to Wildemount'} fileName={'spells-egw.json'} />
                    <Item text={'Tasha\'s Cauldron of Everything'} fileName={'spells-tce.json'} />
                    <Item text={'Fizban\'s Treasury of Dragons'} fileName={'spells-ftd.json'} />
                    <Item text={'Astral Adventurer\'s Guide'} fileName={'spells-aag.json'} />
                    <Item text={'Strixhaven: A Curriculum of Chaos'} fileName={'spells-scc.json'} />
                    <Item text={'Icewind Dale - Rime of the Frostmaiden'} fileName={'spells-idrotf.json'} />
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default App;
