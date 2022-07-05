import Main from '../components/Layout';
import Link from 'next/link';
import { create } from 'ipfs-http-client';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function NewNetwork() {
  const { address } = useAccount();
  const [ipfs, setIpfs] = useState(null);
  const [networkUrl, setNetworkUrl] = useState("");

  useEffect(() => {
    setIpfs(create({
      url: 'https://ipfs.infura.io:5001/api/v0',
    }));
  }, []);

  async function createNetwork(event) {
    event.preventDefault();
    const { name, content } = event.target.elements;
    let lines = content.value.split("\n")
    const splitLines = [];
    lines.forEach(element => {
      splitLines.push(element);
    });
    const res = await ipfs.add(JSON.stringify({
      name: name.value,
      creator: address ? address : 'unknown',
      addresses: splitLines
    }));
    setNetworkUrl(`/network/${res.path}`)
  }

  return (
    <Main active={'create'}>
      <div className="p-5 py-20 rounded-md mx-auto">
        <h1 className="text-3xl font-bold text-center">Create a network</h1>
        {networkUrl ?
        <div className="mt-10 text-center text-lg">
        <Link href={networkUrl} passHref>
          <a className="text-white bg-blue-800 px-4 py-2 rounded-xl shadow-lg">View network</a>
        </Link>
        </div>:
        <form onSubmit={createNetwork} className="mt-5">
          <input type="text" name="name" placeholder="Network name" className="px-4 py-2 mt-4 text-md outline-none w-full rounded-xl border border-gray-400 focus-within:border-blue-800 duration-150 shadow-sm focus-within:shadow-md" required/>
          <textarea
            type="text"
            name="content"
            autoComplete="off"
            placeholder="Enter all addresses in the network on a new line without commas:"
            className="px-4 py-2 h-32 mt-4 text-md outline-none w-full rounded-xl border border-gray-400 focus-within:border-blue-800 duration-150 shadow-sm focus-within:shadow-md"
            required
          />
          <div className="mt-4">
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="text-lg py-1 px-4 duration-100 bg-blue-800 text-white rounded-xl shadow-lg hover:scale-110"
            >
              Create network
            </button>
          </div>
        </form>}
      </div>
    </Main>
  )
}
