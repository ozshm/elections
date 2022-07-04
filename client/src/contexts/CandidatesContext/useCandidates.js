import { useContext } from "react";
import CandidatesContext from "./CandidatesContext";

const useCandidates = () => useContext(CandidatesContext);

export default useCandidates;
