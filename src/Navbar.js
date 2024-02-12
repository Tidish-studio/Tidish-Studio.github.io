import { MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <MenuItem>
                        <Link component={RouterLink} to="/" underline="none">
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Spells
                            </Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link component={RouterLink} to="/privacy-policy" underline="none">
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Privacy policy
                            </Typography>
                        </Link>
                    </MenuItem>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
