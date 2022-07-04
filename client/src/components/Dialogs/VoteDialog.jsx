import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { useEth } from '../../contexts/EthContext';


export default function VoteDialog({ candidateName, candidateId, isVotingOpen}) {

    const { state: { web3, contract } } = useEth();

    const [open, setOpen] = React.useState(false);
    const [userAgree, setUserAgree] = React.useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleVote = async () => {

        console.log("set vote!");
        setOpen(false);

        const tokenId = await contract.methods.getTokenId(web3.eth.defaultAccount).call();
        console.log("tokenId ", tokenId);

        contract.methods.voteCandidate(candidateId).send({from: web3.eth.defaultAccount})
        .then ((result)=>{
            console.log(result);
        });
    }

    return (
        <div>
            <Button disabled={!isVotingOpen} size="small" variant="contained" onClick={handleClickOpen}>
                Vote
            </Button>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
                PaperProps={{ sx: { width: '22%' } }}
            >
                <DialogTitle id="alert-dialog-title">
                    Vote {candidateName}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm your vote <br/>
                        This action can't be undone
                    </DialogContentText>
                    <FormGroup style={{top:'20px'}}>
                        <FormControlLabel control={<Checkbox  onChange={ (e) => {
                            setUserAgree(e.target.checked ? true:false);
                        }}/>} label="I consent to place my vote" />
                        {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant='contained'
                        disabled={!userAgree}
                        onClick={handleVote}
                        >
                        Confirm Vote
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
