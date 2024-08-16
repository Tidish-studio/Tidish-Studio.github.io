import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Item from './Item';

const SpellsPage = () => {
    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography variant="h3" gutterBottom color={'white'}>
                Choose Spells
            </Typography>
            <Item text={'All The Spells'} fileName={'spells-all.json'} />
            <Item text={"Player's handbook"} fileName={'spells-phb.json'} />
            <Item text={"Xanathar's Guide to Everything"} fileName={'spells-xge.json'} />
            <Item text={"Guildmaster's Guide to Ravnica"} fileName={'spells-ggr.json'} />
            <Item text={'Acquisitions Incorporated'} fileName={'spells-ai.json'} />
            <Item text={"Explorer's Guide to Wildemount"} fileName={'spells-egw.json'} />
            <Item text={"Tasha's Cauldron of Everything"} fileName={'spells-tce.json'} />
            <Item text={"Fizban's Treasury of Dragons"} fileName={'spells-ftd.json'} />
            <Item text={"Astral Adventurer's Guide"} fileName={'spells-aag.json'} />
            <Item text={'Strixhaven: A Curriculum of Chaos'} fileName={'spells-scc.json'} />
            <Item text={'Icewind Dale - Rime of the Frostmaiden'} fileName={'spells-idrotf.json'} />
            <Item text={'New all spells - DO NOT IMPORT'} fileName={'spells-all-new.json'} />
        </Box>
    );
};

export default SpellsPage;
