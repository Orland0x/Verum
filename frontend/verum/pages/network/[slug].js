import Main from '../../components/Layout';
import Attestation from '../../components/Cards/Attestation';
import GenericButton from '../../components/Buttons/GenericButton';
import { useRouter } from 'next/router';
import { fetchIPFSData, formatAddress } from '../../utils/ethersUtils';
import { useState, useEffect, useContext } from 'react';
import { NetworkContext } from '../../context/networkContext';

export default function Browse() {
  const router = useRouter();
  const { slug } = router.query;
  const { network, setNetwork } = useContext(NetworkContext);
  const [networkData, setNetworkData] = useState({});

  useEffect(() => {
    if (!slug) return;
    async function foo() {
    const data = await fetchIPFSData(slug);
    data['cid'] = slug;
    setNetworkData(data);
    }
    foo();
  }, [slug])

  async function selectNetwork() {
    if (!networkData) return;
    setNetwork(networkData);
    router.push('/browse');
  }

  return (
    <Main>
      <div className="mt-14 text-center">
        {Object.keys(networkData).length ?
        <>
        <h3 className="text-3xl font-bold">{networkData.name}</h3>
        <p className="mt-4 text-sm">Created by: {networkData.creator != 'unknown' ? formatAddress(networkData.creator) : networkData.creator}</p>
        <GenericButton action={() => selectNetwork()}>Brose network</GenericButton>
        <h3 className="text-xl font-semibold mt-4">Addresses:</h3>
        <div className="grid grid-cols-1">
          {networkData.addresses.map((el, index) => (
            <Attestation key={index} address={el}/>
          ))}
        </div>
        </>:
        <div className="text-3xl font-bold">Loading...</div>
        }
      </div>
    </Main>
  )
}
