import React from 'react'
import { useState, useEffect } from 'react';
import useEth from "../EthContext/useEth";
import CandidatesContext from './CandidatesContext';
import Button from '@mui/material/Button';


function CandidatesProvider({ children }) {

    const { state: { contract } } = useEth();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVotingOpen, setIsVotingOpen] = useState(false);

    // const { candidates, setCandidates} = useContext(CandidatesContext);

    const readCandidates = async () => {
      setLoading(true);
        const candidatesCount = await contract.methods.getCandidatesCount().call();

        if (candidates.length < candidatesCount){
          
          for (let i = 1; i <= candidatesCount; i++) {
            const candidate = await contract.methods.candidates(i).call();
            const cId = candidate[0]
            const cName = candidate[1];
            const cSlogan = candidate[2];
            const cVoteCount = candidate[3];
            candidates.push({ id: cId, name: cName, slogan: cSlogan, voteCount: cVoteCount });
            setCandidates(candidates);
            // setCandidates(candidates
            //     .push({ id: cId, name: cName, slogan: cSlogan, voteCount: cVoteCount}));           
          }

          

        }

      const votingOpen = await contract.methods.getIsVotingOpenValue().call();
      setIsVotingOpen(votingOpen)


      setLoading(false);
 
    } 




  return (

          
          <CandidatesContext.Provider value={
      { candidates, setCandidates, readCandidates, loading, isVotingOpen, setIsVotingOpen}
               }>
            { children }
              <Button 
        sx={{ alignSelf: 'center', marginLeft: '47%', fontSize:'12px', marginTop: '5px'}} 
              type='button' 
              onClick={readCandidates}
              size='large'
              variant='text'
              
              > Fetch Candidates</Button>
          </CandidatesContext.Provider> 

          
        //   <h2>GetCandidates</h2>
        //   <button onClick={readCandidates}>
        //       GetCandidates()
        //   </button>
          
        
  )
}

export default CandidatesProvider;