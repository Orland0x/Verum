import Link from "next/link";
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { FaPlus, FaUserAlt, FaNetworkWired, FaHome, FaUsers } from 'react-icons/fa';

export default function SideBar({ active, newPost }) {
  const { address } = useAccount();
  const [connectedAddress, setConnectedAddress] = useState('');
  useEffect(() => {
    if (!address) return;
    setConnectedAddress(address);
  }, [address])

  return (
    <div className="hidden lg:inline col-span-2">
      <div className="sticky top-28 mr-5">
        <div className="mt-11 flex flex-col text-sm space-y-4">
          <Link href="/browse" passHref>
            <div className={"flex items-center font-medium cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-xl duration-150" + (active == 'browse' ? " bg-blue-800 text-white hover:bg-blue-800" : " text-gray-700")}>
              <FaHome/>
              <p className="duration-100 ml-2">Browse</p>
            </div>
          </Link>
          <Link href="/networks" passHref>
            <div className={"flex items-center font-medium cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-xl duration-150" + (active == 'networks' ? " bg-blue-800 text-white hover:bg-blue-800" : " text-gray-700")}>
              <FaUsers/>
              <p className="duration-100 ml-2">Networks</p>
            </div>
          </Link>
          <Link href="/new-network" passHref>
            <div className={"flex items-center font-medium cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-xl duration-150" + (active == 'create' ? " bg-blue-800 text-white hover:bg-blue-800" : " text-gray-700")}>
              <FaNetworkWired/>
              <p className="duration-100 ml-2">Create Network</p>
            </div>
          </Link>
          <div className={"flex items-center font-medium cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-xl duration-150" + (active == 'post' ? " bg-blue-800 text-white hover:bg-blue-800" : " text-gray-700")} onClick={() => newPost()}>
            <FaPlus/>
            <p className="ml-2 duration-100">New Post</p>
          </div>
          {connectedAddress &&
          <Link href={"/address/" + connectedAddress} passHref>
            <div className={"flex items-center font-medium cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-xl duration-150" + (active == 'profile' ? " bg-blue-800 text-white hover:bg-blue-800" : " text-gray-700")}>
              <FaUserAlt/>
              <p className="duration-100 ml-2">Profile</p>
            </div>
          </Link>}
        </div>
      </div>
    </div>
  )
}
