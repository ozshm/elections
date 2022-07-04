import { EthProvider } from "./contexts/EthContext";
// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
// import Demo from "./components/Demo";
// import Footer from "./components/Footer";
import "./App.css";
import CandidatesProvider from "./contexts/CandidatesContext/CandidatesProvider";

import Candidates from "./components/Candidates";

import { useEffect } from "react";
// import useCandidates from "./contexts/CandidatesContext/useCandidates";

import ResponsiveAppBar from "./components/AppBar";




function App() {

  useEffect(() => {
    document.title = "Elections"
  }, [])


  return (
    <EthProvider>
      <CandidatesProvider>
        <ResponsiveAppBar/>
        <Candidates/>
      </CandidatesProvider>
      


  {/* //     <div id="App" >
  //       <div className="container">
  //         <Intro />
  //         <hr />
  //         <Setup />
  //         <hr />
  //         <Demo />
  //         <hr />
  //         <Footer />
  //       </div> }
  //       <Candidates />
  // </div>  */}

     </EthProvider >
  );
}

export default App;
