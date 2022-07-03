import AvatarIcon from '../Content/AvatarIcon';
import { useAccount, useSigner } from 'wagmi';
import { FaPaperPlane } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function CommentCard() {
  const { address } = useAccount();
  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(() => {
    if (!address) return;
    setConnectedAddress(address);
  }, [address])

  return (
    <div className="p-4 bg-white border border-gray-200 cursor-pointer rounded-2xl border-gray-500 shadow-md my-4">
      <div className="flex items-center justify-around space-x-2">
        <div className="mr-2">
          {connectedAddress ? <AvatarIcon address={connectedAddress}/>:
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>}
        </div>
        <textarea
          type="text"
          name="comment"
          autoComplete="off"
          placeholder="Start typing..."
          className="w-11/12 px-4 py-2 outline-none rounded-xl border border-black shadow-sm"
        />
        <div className="ml-8">
          <button className="px-4 py-2 bg-blue-800 text-white rounded-xl"><FaPaperPlane/></button>
        </div>
      </div>
    </div>
  )
}
