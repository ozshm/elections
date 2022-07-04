import React from 'react'
import { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function CreateCandidate() {

    const { state: { contract, accounts } } = useEth();
    const [candidates, setCandidates] = useState();


    

  return (
    <div>CreateCandidate</div>
  )
}

export default CreateCandidate