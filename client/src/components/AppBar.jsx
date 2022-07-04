import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Dialog from '@mui/material/Dialog';
// import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


import useEth from "../contexts/EthContext/useEth";
import useCandidates from "../contexts/CandidatesContext/useCandidates";

import ResultsDialog from './Dialogs/ResultsDialog';


// const settings = ['Add Candidate', 'Open Voting'];

const ResponsiveAppBar = () => {
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const { state: { web3, contract } } = useEth();
    const  { candidates, setCandidates, isVotingOpen, setIsVotingOpen} = useCandidates();

    const [open, setOpen] = React.useState(false);

    const [settings, setSettings] = React.useState(() => isVotingOpen ? ['Add Candidate', 'Close Voting'] : ['Add Candidate', 'Open Voting'])

    const [candidate, setCandidate] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const addCandidate = () => {
        console.log(JSON.stringify(candidate));
        contract.methods.addCandidate(candidate.name, candidate.slogan).send({from: web3.eth.defaultAccount})
        .then( () => {
            console.log("candidate added!");
            setOpen(false);
        })
    }



    const getVotingCard = () => {
        console.log("wallet address: ", web3.eth.defaultAccount); 
        contract.methods.mintVotingCard(web3.eth.defaultAccount).send({ from: web3.eth.defaultAccount
}).then((e)=> {
            console.log("Token address: ", e.events.Transfer.address);
            console.log("transaction: ", e);
        })

    }


    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        switch (setting){
            case 'Add Candidate': 
                console.log("add candidate");
                setOpen(true);
                // TODO add candidate page (FORM)
                
                // contract.methods.addCandidate('Bibi Nethanyahu', 'Rak bibi').send({ from: web3.eth.defaultAccount}).then( (result) =>{
                //     console.log('candidate has been added');
                // })

                console.log(candidates);
                // console.log(candidates);
                setCandidates([]);
                // getCandidates();
                break;
            case 'Open Voting':
                
                contract.methods.toggleIsVotingOpen().send({ from: web3.eth.defaultAccount })
                .then((t)=> {
                    console.log("open voting");
                    settings.pop()
                    settings.push('Close Voting');
                    console.log('toggled');
                    setIsVotingOpen(!isVotingOpen);
                })
                .catch( (t) => {
                    console.log("catch");
                    console.log(t);
                })

                break;
            case 'Close Voting':
                console.log("close voting");
                settings.pop()
                settings.push('Open Voting');

                contract.methods.toggleIsVotingOpen().send({ from: web3.eth.defaultAccount }).then(() => {
                    console.log('toggled');
                    setIsVotingOpen(!isVotingOpen);
                });

                break;
            default:
                break;
        }
        
    };

    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Montserrat', 
                            fontWeight: 700,
                            letterSpacing: '.23rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ELECTIONS 2022
                    </Typography>           
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}/>
                        <ResultsDialog/>
                    <Box >
                        <Button 
                            style={{background:'navy', margin:'15px', fontSize:'small', color:'white'}}
                            onClick={getVotingCard}
                        > Get Voting Card! </Button>
                        </Box> 
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Admin Panel" sx={{ mt: '-10px' }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AdminPanelSettingsIcon fontSize='large'/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '30px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={ ()=> handleCloseUserMenu(setting)} 
                                    sx={{ backgroundColor: 'inherit'}}>
                                    <Typography textAlign="center" fontSize="small">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ sx: { width:'22%'}}}
            >
                <DialogTitle id="alert-dialog-title">
                    Add Candidate
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name:"
                        type="string"
                        variant="standard"
                        sx={{ width: '170px' }}
                        onChange={(e) => {
                            e.preventDefault();
                            setCandidate({...candidate ,'name': e.target.value});
                        }}
                    />
                    <br/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Slogan:"
                        type="string"
                        variant="standard"
                        sx={{ width: '170px' }}
                        onChange={(e) => {
                            e.preventDefault();
                            setCandidate({ ...candidate, 'slogan': e.target.value });
                        }}
                    />
                    {/* <DialogContentText id="alert-dialog-description">
                        Please confirm your vote <br />
                        This action can't be undone
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant='contained'
                        disabled={(candidate?.name && candidate?.slogan) ? false:true}
                        onClick={addCandidate}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default ResponsiveAppBar;
