import AvatarIcon from '../Content/AvatarIcon';
import { resolveAddressToEns, formatAddress, fetchIPFSData } from '../../utils/ethersUtils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

export default function Post({ sliceAmount, postData, suppressClick }) {
  const router = useRouter();
  const [ens, setEns] = useState("");
  const [content, setContent] = useState({});
  useEffect(() => {
    async function foo() {
      setEns(await resolveAddressToEns(postData.profile));
      if (postData.contentURI.split("://")[0] == "ipfs") {
        const fetchedContent = await fetchIPFSData(postData.contentURI.split("://")[1]);
        setContent(fetchedContent);
      }
    }
    foo();
  }, [postData.contentURI, postData.profile])

  function handleUserClick(e) {
    e.stopPropagation();
    router.push("/address/" + postData.profile);
  }

  return (
    <div className="p-4 bg-white border border-gray-200 cursor-pointer rounded-2xl border-gray-500 shadow-md my-4" onClick={suppressClick ? null : () => router.push("/post/" + postData.id)}>
      <div className="flex justify-between items-center space-x-2">
        <div className="flex flex-col">
          <div className="flex items-center align-center space-x-2 mb-4">
            <div onClick={(e) => handleUserClick(e)}>
              <AvatarIcon address={postData.profile}/>
            </div>
            <div className="p-2" onClick={(e) => handleUserClick(e)}>
              <div className="text-lg font-bold">{ens ? ens : formatAddress(postData.profile)}</div>
              <div className="mt-0 text-sm">{ens ? formatAddress(postData.profile) : null}</div>
            </div>
          </div>
          <div className="mb-3 ml-4">
          {Object.keys(content).length ?
          <>
          {sliceAmount && content.content.length > sliceAmount ? content.content.slice(0, sliceAmount) + "..." : content.content}
          </>:null}
          {content.urls &&
          <div className="text-center mt-5 flex flex-row gap-x-3">
            {content.urls.map((el, index) => (
              <img src={el} width={100} height={100} key={index}></img>
            ))}
          </div>}
          </div>
        </div>
        {postData.timestamp &&
          <div className="flex flex-col justify-end">
            <div>{moment.unix(postData.timestamp).format('D/M/Y')}</div>
          </div>
        }
      </div>
    </div>
  )
}
