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
import { useAccount, useEnsName } from 'wagmi';
import AvatarIcon from '../../components/Content/AvatarIcon';

export default function Browse() {
  const { address:connectedAddress } = useAccount();
  const router = useRouter();
  const { slug } = router.query;
  const [address, setAddress] = useState('');
  const [ens, setEns] = useState('');
  const [validSearch, setValidSearch] = useState(true);
  const [filter, setFilter] = useState(0);

  const data = "null";

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

  if (validSearch) {
    return (
      <Main active={connectedAddress == address ? 'profile' : null }>
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
              {data == null ?
              <ProfileContentSkeleton filter={filter}/>:
              <ProfileContent filter={filter} data={[{address: "0x249070c20d9d200C0515a5B003C9d1833e9F52E5"}, {address: "0xe6fe06cc693851c2f4db869be0f70094361bfb80"}]}/>}
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
              <div className="flex w-full items-center h-16 mt-6">
                <div className="w-1/3 border-t border-r justify-center flex flex-col items-center border-white h-full">
                  <p className="text-sm font-medium">Posts</p>
                  <p>7</p>
                </div>
                <div className="w-1/3 border-t border-r justify-center flex flex-col items-center border-white h-full">
                  <p className="text-sm font-medium">Comments</p>
                  <p>6</p>
                </div>
                <div className="w-1/3 border-t justify-center flex flex-col items-center border-white h-full">
                  <p className="text-sm font-medium">Attestations</p>
                  <p>3</p>
                </div>
              </div>
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
