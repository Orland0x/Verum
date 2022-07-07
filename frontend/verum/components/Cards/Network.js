import { fetchIPFSData } from '../../utils/ethersUtils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Network({ cid }) {
  const router = useRouter();
  const [content, setContent] = useState({});
  useEffect(() => {
    async function foo() {
      const fetchedContent = await fetchIPFSData(cid);
      console.log(fetchedContent)
      setContent(fetchedContent);
    }
    foo();
  }, [cid])

  return (
    <div className="p-4 bg-white border border-gray-200 cursor-pointer rounded-2xl border-gray-500 shadow-md my-4" onClick={() => router.push("/network/" + cid)}>
      <div className="flex justify-between items-center space-x-2">
        <div className="flex flex-col">
          <div className="flex items-center align-center space-x-2">
            <div className="p-2">
              <div className="text-lg font-bold">{Object.keys(content).length ? content.name : null}</div>
              <div className="mt-0 text-sm">{Object.keys(content).length ? "By: " + content.creator : null}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end text-center">
          <div className="font-bold">{Object.keys(content).length ? content.addresses.length : null}</div>
          <div>{Object.keys(content).length ? "Users" : null}</div>
        </div>
      </div>
    </div>
  )
}
