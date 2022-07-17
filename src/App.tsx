import { Header } from './components/componentsPage/Header';
import { IndexesPage } from './pages/IndexesPage';
import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import addressContract from './abi/contractABI';
import { ICaContract } from './types/types';
import { Loader } from './components/componentsUI/Loader';

export  const caContractContext = createContext<ICaContract | null>(null);

const App :React.FC = () => {
  const [caContract, setCaContract] = useState<ICaContract>()

  useEffect(() => {
    getProvider()
  }, [])

  const getProvider = () => {
    const web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/')
    const address = addressContract(web3)
    setCaContract(address)
  }

  if(caContract  === undefined) return <Loader/>

  return (
    <div className="app">
      <Header/>
      <div className="container">
        <caContractContext.Provider value={caContract}>
          <IndexesPage caContract={caContract} />
        </caContractContext.Provider>
      </div>
    </div>
  );
}

export default App;
