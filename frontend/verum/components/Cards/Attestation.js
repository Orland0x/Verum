import AvatarIcon from '../Content/AvatarIcon';
import { resolveAddressToEns, formatAddress } from '../../utils/ethersUtils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

export default function Attestation({ address, timestamp, value }) {
  const router = useRouter();
  const [ens, setEns] = useState("");
  useEffect(() => {
    async function foo() {
      setEns(await resolveAddressToEns(address));
    }
    foo();
  }, [address])
  return (
    <div className="p-4 bg-white border border-gray-200 cursor-pointer rounded-2xl border-gray-500 shadow-md my-4" onClick={() => router.push('/address/' + address)}>
      <div className="flex justify-between items-center space-x-2">
        <div className="flex items-center">
        <AvatarIcon address={address}/>
        <div className="p-2 text-left">
          <div className="text-lg font-bold">{ens ? ens : formatAddress(address)}</div>
          <div className="mt-0 text-sm ml-0">{ens ? formatAddress(address) : null}</div>
        </div>
        </div>
        {timestamp && value &&
          <div className="flex flex-col justify-end">
            <div className="font-bold text-center">Score: {value}</div>
            <div>{moment.unix(timestamp).format('D/M/Y')}</div>
          </div>
        }
      </div>
    </div>
  )
}
