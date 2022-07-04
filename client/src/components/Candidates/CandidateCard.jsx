import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DonateDialog from '../Dialogs/DonateDialog';
import VoteDialog from '../Dialogs/VoteDialog';

export default function CandidateCard({ name, id, slogan, isVotingOpen, setIsVotingOpen}) {



    return (
        <Card sx={{ maxWidth: 345 }}>
            {/* <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    { name }
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    { slogan }
                </Typography>
            </CardContent>
            <CardActions>
                <DonateDialog
                    candidateName={name}
                    isVotingOpen={isVotingOpen}
                    setIsVotingOpen={setIsVotingOpen}
                />
                <VoteDialog
                    candidateName={name}
                    candidateId={id}
                    isVotingOpen={isVotingOpen}
                    setIsVotingOpen={setIsVotingOpen}
                />
                {/* <Button size="small">Donate</Button> */}
                {/* <Button variant="contained" size="small">Vote</Button> */}
            </CardActions>
        </Card>
    );
}
