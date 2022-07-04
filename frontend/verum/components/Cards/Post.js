import AvatarIcon from '../Content/AvatarIcon';
import { resolveAddressToEns, formatAddress, fetchIPFSData } from '../../utils/ethersUtils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// const postData = {
//   id: 1,
//   profile: "0xe6fe06cc693851c2f4db869be0f70094361bfb80",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet purus nec tincidunt maximus. In efficitur facilisis varius. Nam quis quam molestie, lacinia enim sit amet, porta risus. Quisque pellentesque nisi sit amet malesuada pharetra. Pellentesque in maximus sem, nec condimentum lorem. Sed eleifend justo a nisl porta bibendum. Interdum. "
// }

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
      <div className="flex items-center align-center space-x-2 mb-4">
        <div onClick={(e) => handleUserClick(e)}>
        <AvatarIcon address={postData.profile}/>
        </div>
        <div className="p-2" onClick={(e) => handleUserClick(e)}>
          <div className="text-lg font-bold">{ens ? ens : formatAddress(postData.profile)}</div>
          <div className="mt-0 text-sm">{ens ? formatAddress(postData.profile) : null}</div>
        </div>
      </div>
      <div className="mb-3">
        {sliceAmount ? content.content.slice(0, sliceAmount) + "..." : content.content}
      </div>
    </div>
  )
}
