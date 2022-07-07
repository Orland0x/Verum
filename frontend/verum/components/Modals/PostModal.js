import { motion } from "framer-motion";
import AvatarIcon from '../Content/AvatarIcon';
import { useAccount, useSigner } from 'wagmi';
import { FaPaperPlane, FaRedo } from 'react-icons/fa';
import { create } from 'ipfs-http-client';
import { useState, useEffect } from 'react';
import { postContent } from '../../utils/contractUtils';

export default function PostModal(props) {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [ipfs, setIpfs] = useState(null);
  const [posted, setPosted] = useState(false);
  const [txState, setTxState] = useState(null);

  function handleTx(tx) {
    setTxState('pending...');
    tx.wait().then((response) => {
      setTxState('uploaded!');
    }).catch((error) => {
      setTxState('failed!');
    })
  }

  useEffect(() => {
    setIpfs(create({
      url: 'https://ipfs.infura.io:5001/api/v0',
    }));
  }, []);

  async function createPost(event) {
    event.preventDefault();
    const { content, links } = event.target.elements;
    let lines = links.value.split(", ")
    const splitLines = [];
    lines.forEach(element => {
      splitLines.push(element);
    });
    const res = await ipfs.add(JSON.stringify({
      content: content.value,
      urls: splitLines
    }));
    const tx = await postContent(signer, `ipfs://${res.path}`);
    console.log(res.path)
    handleTx(tx);
    setPosted(true);
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-5" onClick={() => {props.close()}}
      >
      <motion.main
      transition={{ duration: 0.5, delay: 0}}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 10, opacity: 0 }}>
        <div className="relative w-auto my-6 mx-auto max-w-full max-h-screen my-5 mx-5 py-5">
          <div className="w-full p-4 bg-white border border-gray-200 rounded-2xl border-gray-500 shadow-md my-4" onClick={e => {e.stopPropagation();}}>
            {posted ?
              <>
              <div className="flex items-center justify-around space-x-2">
                <div className="mr-2">
                  {address ? <AvatarIcon address={address}/>:
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>}
                </div>
                <h3 className="text-xl font-semibold">Post {txState}</h3>
              </div>
              <div className="flex justify-center mt-3">
                <button className="px-4 py-2 bg-blue-800 text-white rounded-xl" onClick={() => setPosted(false)}><FaRedo/></button>
              </div>
              </>
            :
            <form onSubmit={createPost}>
              <div className="flex items-center justify-around space-x-2">
                <div className="mr-2">
                  {address ? <AvatarIcon address={address}/>:
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>}
                </div>
                <div className="flex flex-col">
                <textarea
                  type="text"
                  name="content"
                  autoComplete="off"
                  placeholder="Start typing..."
                  className="w-96 px-4 py-2 outline-none rounded-xl border border-black shadow-sm"
                />
                <input type="text" name="links" placeholder="URLs, seperated by commas" className="mt-4 px-4 py-2 outline-none rounded-xl border border-black shadow-sm"/>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded-xl"><FaPaperPlane/></button>
              </div>
            </form>}
          </div>
        </div>
        </motion.main>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
};
