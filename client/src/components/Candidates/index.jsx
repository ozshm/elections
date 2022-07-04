import React from 'react'

import { useEffect } from 'react';

import CandidateCard from './CandidateCard';
import useCandidates from '../../contexts/CandidatesContext/useCandidates';

import Typography from '@mui/material/Typography';

function Candidates() {

    // const { candidates, setCandidates } = useCandidates();
    // console.log(candidates);
  const { candidates,  isVotingOpen, setIsVotingOpen  } = useCandidates();

  // useEffect( () => {
  //   console.log('loading: ',loading);
  // }, [loading]);


  return (
    <>
      <Typography align='center' variant='h1' sx={{margin: '25px'}}> Candidates</Typography>
      <div className= 'grid-container'>
        {candidates.map((candidate) =>
        (<CandidateCard className='grid-item'
          key={candidate.name}
          name={candidate.name}
          id={candidate.id}
          slogan={candidate.slogan}
          isVotingOpen= {isVotingOpen}
          setIsVotingOpen={setIsVotingOpen} />))
        }
      </div>
      
    </>
  )
}

export default Candidates;