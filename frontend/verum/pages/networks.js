import Main from '../components/Layout';
import Network from '../components/Cards/Network';
import { getNetworks } from '../utils/directoryUtils';
import { useEffect, useState } from 'react';

export default function Browse() {
  const [networks, setNetworks] = useState([]);
  useEffect(() => {
    async function foo() {
      const fetchedNetworks = await getNetworks();
      if (fetchedNetworks == 'error') return;
      console.log(fetchedNetworks)
      setNetworks(fetchedNetworks);
    }
    foo();
  }, [])
  return (
    <Main active={'networks'}>
      <div className="p-5 py-20 rounded-md mx-auto">
        <h1 className="text-3xl font-bold text-center">Networks</h1>
        <div className="mt-10">
        {networks.map((el, index) => (
          <Network key={index} cid={el}/>
        ))}
        </div>
      </div>
    </Main>
  )
}
