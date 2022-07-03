import AvatarIcon from '../Content/AvatarIcon';
import { resolveAddressToEns, formatAddress } from '../../utils/ethersUtils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Attestation({ user }) {
  const router = useRouter();
  const [ens, setEns] = useState("");
  useEffect(() => {
    async function foo() {
      setEns(await resolveAddressToEns(user.address));
    }
    foo();
  })
  return (
    <div className="p-4 bg-white border border-gray-200 cursor-pointer rounded-2xl border-gray-500 shadow-md my-4" onClick={() => router.push('/address/' + user.address)}>
      <div className="flex items-center space-x-2">
        <AvatarIcon address={user.address}/>
        <div className="p-2">
          <div className="text-lg font-bold">{ens ? ens : formatAddress(user.address)}</div>
          <div className="mt-0 text-sm">{ens ? formatAddress(user.address) : null}</div>
        </div>
      </div>
    </div>
  )
}
