import AvatarIcon from '../Content/AvatarIcon';
import { useAccount, useSigner } from 'wagmi';
import { FaPaperPlane, FaRedo } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import { postComment } from '../../utils/contractUtils';

export default function CommentCard({ postID, refresh }) {
  const { address } = useAccount();
  const [connectedAddress, setConnectedAddress] = useState("");
  const { data: signer } = useSigner();
  const [ipfs, setIpfs] = useState(null);
  const [posted, setPosted] = useState(false);
  const [txState, setTxState] = useState(null);

  useEffect(() => {
    if (!address) return;
    setConnectedAddress(address);
  }, [address])

  function handleTx(tx) {
    setTxState('pending...');
    tx.wait().then((response) => {
      setTxState('uploaded!');
      refresh();
    }).catch((error) => {
      setTxState('failed!');
    })
  }

  useEffect(() => {
    setIpfs(create({
      url: 'https://ipfs.infura.io:5001/api/v0',
    }));
  }, []);

  async function createComment(event) {
    event.preventDefault();
    const { content } = event.target.elements;
    const res = await ipfs.add(JSON.stringify({
      content: content.value
    }));
    const tx = await postComment(signer, postID, `ipfs://${res.path}`);
    handleTx(tx);
    setPosted(true);
  }

  return (
    <div className="p-4 bg-white border border-gray-200 cursor-pointer rounded-2xl border-gray-500 shadow-md my-4">
      {posted ?
        <>
        <div className="flex items-center justify-start space-x-2">
          <div className="mr-2">
            {address ? <AvatarIcon address={address}/>:
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>}
          </div>
          <h3 className="text-xl font-semibold">Comment {txState}</h3>
        </div>
        <div className="flex justify-center mt-3">
          <button className="px-4 py-2 bg-blue-800 text-white rounded-xl" onClick={() => setPosted(false)}><FaRedo/></button>
        </div>
        </>
      :
      <form onSubmit={createComment}>
        <div className="flex items-center justify-around space-x-2">
          <div className="mr-2">
            {connectedAddress ? <AvatarIcon address={connectedAddress}/>:
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>}
          </div>
          <textarea
            type="text"
            name="content"
            autoComplete="off"
            placeholder="Start typing..."
            className="w-11/12 px-4 py-2 outline-none rounded-xl border border-black shadow-sm"
          />
          <div className="ml-8">
            <button className="px-4 py-2 bg-blue-800 text-white rounded-xl"><FaPaperPlane/></button>
          </div>
        </div>
      </form>}
    </div>
  )
}
