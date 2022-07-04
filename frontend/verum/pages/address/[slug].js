import Main from '../../components/Layout';
import ProfileContent from '../../components/Content/ProfileContent';
import ProfileContentSkeleton from '../../components/Skeletons/ProfileContentSkeleton';
import { formatAddress,
        isAddress,
        isEns,
        resolveEnsToAddress,
        resolveAddressToEns }
        from '../../utils/ethersUtils';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAccount, useSigner } from 'wagmi';
import AvatarIcon from '../../components/Content/AvatarIcon';
import useSWR from 'swr';
import { FaRedo } from 'react-icons/fa';
import { attestToProfile } from '../../utils/contractUtils';

const fetcher = (url) => fetch(url).then(async (res) => await res.json())

export default function Browse() {
  const { data: signer } = useSigner();
  const { address:connectedAddress } = useAccount();
  const router = useRouter();
  const { slug } = router.query;
  const [address, setAddress] = useState('');
  const [ens, setEns] = useState('');
  const [validSearch, setValidSearch] = useState(true);
  const [filter, setFilter] = useState(0);
  const [attestationValue, setAttestationValue] = useState(0);
  const [attested, setAttested] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function foo() {
      if (isEns(slug) == true) {
        const returnAddress = await resolveEnsToAddress(slug);
        if (returnAddress != 'error' && returnAddress != null) {
          setEns(slug);
          setAddress(returnAddress);
        } else {
          setValidSearch(false);
        }
      } else if (isAddress(slug) == true) {
        setAddress(slug);
        setEns(await resolveAddressToEns(slug));
      } else {
        setValidSearch(false);
      }
    }
    foo();
  }, [slug])

  async function submitAttestation() {
    const tx = await attestToProfile(signer, address, attestationValue)
    setAttested(true);
  }

  const { data:posts, error:postsError } = useSWR(address ? '/api/posts?address=' + address : null, fetcher);
  const { data:attestationsReceived, error:attestationsReceivedError } = useSWR(address ? '/api/attestationsReceived?address=' + address : null, fetcher);
  const { data:attestationsGiven, error:attestationsGivenError } = useSWR(address ? '/api/attestationsGiven?address=' + address : null, fetcher);
  const { data:currentAttestation, error:currentAttestationError } = useSWR(address && connectedAddress && address.toLowerCase() != connectedAddress.toLowerCase() ? '/api/getAttestation?attestor=' + connectedAddress + '&profile='+ address : null, fetcher);
  if (validSearch) {
    return (
      <Main active={address && connectedAddress && connectedAddress.toLowerCase() == address.toLowerCase() ? 'profile' : null }>
        <div className="flex flex-col-reverse md:flex-row mt-14 text-gray-700 space-x-6 justify-between">
          <div className="md:w-2/3 mt-10 md:mt-0">
            <div className="flex justify-around md:items-center space-x-4">
              <div className={"w-24 text-lg flex justify-center py-1 duration-200 hover:font-semibold hover:cursor-pointer" + (filter == 0 ? " font-semibold" : "")} onClick={() => setFilter(0)}>
                Posts
              </div>
              <div className={"w-24 text-lg flex justify-center py-1 duration-200 hover:font-semibold hover:cursor-pointer" + (filter == 1 ? " font-semibold" : "")} onClick={() => setFilter(1)}>
                Attested to
              </div>
              <div className={"w-24 text-lg flex justify-center py-1 duration-200 hover:font-semibold hover:cursor-pointer" + (filter == 2 ? " font-semibold" : "")} onClick={() => setFilter(2)}>
                Attestations
              </div>
            </div>
            <div className="mt-8">
              {posts == undefined ?
              <ProfileContentSkeleton filter={filter}/>:
              <ProfileContent filter={filter} posts={posts} attestationsReceived={attestationsReceived} attestationsGiven={attestationsGiven}/>}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="pt-5 shadow-xl w-full bg-blue-800 flex flex-col items-center rounded-2xl border border-white text-white">
              <div className="h-14 bg-indigo-300 absolute top-0 w-full"></div>
              {address ? <AvatarIcon address={address}/> :
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>}
              {address ?
              <>
                <p className="font-bold text-lg mt-1">{ens ? ens : formatAddress(address)}</p>
                <p className="text-sm text-gray-200 mt-1">{ens ? formatAddress(address) : null}</p>
              </>:
              <>
                <div className="w-32 h-5 rounded-lg bg-gray-300 animate-pulse mt-3"></div>
                <div className="w-24 h-3 rounded-lg bg-gray-300 animate-pulse mt-3"></div>
              </>}
              <div className="flex w-full items-center h-16 mt-6 border-b">
                <div className="w-1/3 border-t border-r justify-center flex flex-col items-center border-white h-full">
                  <p className="text-sm font-medium">Posts</p>
                  <p>{posts ? posts.length : 0}</p>
                </div>
                <div className="w-1/3 border-t border-r justify-center flex flex-col items-center border-white h-full">
                  <p className="text-sm font-medium">Attested to</p>
                  <p>{attestationsReceived ? attestationsReceived.length : 0}</p>
                </div>
                <div className="w-1/3 border-t justify-center flex flex-col items-center border-white h-full">
                  <p className="text-sm font-medium">Attestations</p>
                  <p>{attestationsGiven ? attestationsGiven.length : 0}</p>
                </div>
              </div>
              {address && connectedAddress && connectedAddress.toLowerCase() != address.toLowerCase() && address ?
                <div className="flex flex-col justify-center my-5">
                {attested ?
                <button className="px-4 py-2 bg-white rounded-lg shadow-md text-black border border-black hover:scale-110 duration-100" onClick={() => setAttested(false)}><FaRedo/></button>
                :
                <>
                <div className="slider mx-auto">
                  <input
                    id="slider"
                    className="w-full cursor-pointer accent-white rounded-full "
                    type="range"
                    defaultValue={attestationValue}
                    min={-10}
                    max={10}
                    step={1}
                    onChange={(e) => setAttestationValue(e.target.value)}
                  />
                  </div>
                  <div className="text-center mb-2 font-semibold">Attestation strength: {attestationValue}</div>
                  <button className="px-4 py-2 bg-white rounded-lg shadow-md text-black border border-black hover:scale-110 duration-100" onClick={() => submitAttestation()}>Attest</button>
                  </>}
                </div>
                 : null }
            </div>
          </div>
        </div>
      </Main>
    )} else {
      return (
        <Main>
          <div className="flex h-screen justify-center items-center">
            <div className="bg-blue-800 rounded-2xl shadow-lg">
              <h1 className="text-4xl font-bold text-white mx-5 my-3">Invalid search!</h1>
            </div>
          </div>
        </Main>
      )
    }
}
