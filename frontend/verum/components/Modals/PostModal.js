import { motion } from "framer-motion";
import AvatarIcon from '../Content/AvatarIcon';
import { useAccount, useSigner } from 'wagmi';
import { FaPaperPlane } from 'react-icons/fa';

export default function PostModal(props) {
  const { address } = useAccount();

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
            <div className="flex items-center justify-around space-x-2">
              <div className="mr-2">
                {address ? <AvatarIcon address={address}/>:
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>}
              </div>
              <textarea
                type="text"
                name="comment"
                autoComplete="off"
                placeholder="Start typing..."
                className="w-96 px-4 py-2 outline-none rounded-xl border border-black shadow-sm"
              />

            </div>
            <div className="flex justify-center mt-3">
              <button className="px-4 py-2 bg-blue-800 text-white rounded-xl"><FaPaperPlane/></button>
            </div>
          </div>
        </div>
        </motion.main>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
};
