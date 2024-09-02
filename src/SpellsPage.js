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
            <Item text={'All The Spells'} fileName={'spells-all-new.json'} />
            <Item text={"Player's handbook"} fileName={'spells-phb.json'} />
        </Box>
    );
};

export default SpellsPage;
