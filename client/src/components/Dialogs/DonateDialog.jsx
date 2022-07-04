import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useEth } from '../../contexts/EthContext';


export default function DonateDialog({ candidateName, isVotingOpen, setIsVotingOpen }) {

    const { state: { web3, contract } } = useEth();

    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setDonation = () => {

        const amountInEth = web3.utils.toWei(amount, 'ether');

        contract.methods.donate().send({ from: web3.eth.defaultAccount, value: amountInEth})
        .then( () => {
            console.log("donated!");
            setOpen(false);
        })
    }

    return (
        <div>
            <Button disabled={isVotingOpen} size="small" onClick={handleClickOpen}>
                Donate
                </Button>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ sx: { width: '22%' } }}
            >
                <DialogTitle id="alert-dialog-title">
                    Donate to { candidateName }'s Campaign
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please enter the amount of <strong>ETH</strong> you would like to donate to {candidateName}'s campaign.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Amount"
                        type="number"
                        variant="standard"
                        sx={{width:'80px'}}
                        onChange= { (e) => {
                            e.preventDefault();
                            setAmount(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={(setDonation)} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
