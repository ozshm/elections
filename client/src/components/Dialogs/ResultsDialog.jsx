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

import CanvasJSReact from '../../canvasjs.react';



import { useEth } from '../../contexts/EthContext';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function ResultsDialog({ candidateName }) {

    const { state: { web3, contract } } = useEth();

    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [results, setResults] = React.useState([])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resultsFunction = async () => {

        const candidatesCount = await contract.methods.getCandidatesCount().call();

        for (let i = 1; i <= candidatesCount; i++) {
            const candidate = await contract.methods.candidates(i).call();
            const cName = candidate[1];
            const cVoteCount = candidate[3];
            console.log(results);
            // setResults([...results, { label: cName, y: cVoteCount}]);
            results.push({ label: cName, y: parseInt(cVoteCount) });
            // setCandidates(candidates
            //     .push({ id: cId, name: cName, slogan: cSlogan, voteCount: cVoteCount}));           
        }
        setLoading(false);
        console.log(results);

    }

    const Results = () => {

        const options = {
            animationEnabled: true,
            // title: {
            //     text: "Elections Results"
            // },
            data: [
                {
                    type: "column",
                    dataPoints: results
                }
            ],
            axisY: {
                minimum: 0,
            }
        }


        return (
            <>  
                {loading ? (<h2> Elections results </h2>) : (<CanvasJSChart options={options}
                />)
                }
            </>


        )

    }


    const handleClickOpen = async () => {
        await resultsFunction();
        setOpen(true);
    
    };

    const handleClose = () => {
        setOpen(false);
        setResults([]);
    };

    return (

        
        <div>
            <Button size="small" variant="contained" onClick={handleClickOpen}>
                Get Voting Results!
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
                PaperProps={{ sx: { width: '70%', height: '60%' } }}
            >
                <DialogTitle fontSize='32px' id="alert-dialog-title" textAlign='center'>
                    Elections Results
                </DialogTitle>

                {loading ? <h2> loading !</h2> : (<Results loading={loading} setLoading={setLoading} results={results}/>) }

                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        
                    </DialogContentText> */}

                    
                </DialogContent>
            </Dialog>
        </div>
    );



    
}

