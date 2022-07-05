import Main from '../components/Layout';
import BrowseSkeleton from '../components/Skeletons/BrowseSkeleton';
import Post from '../components/Cards/Post';
import GenericButton from '../components/Buttons/GenericButton';
import { useState, useEffect, useContext } from 'react';
import { NetworkContext } from '../context/networkContext';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then(async (res) => await res.json())

export default function Browse() {
  const { network } = useContext(NetworkContext);
  const router = useRouter();
  const { data:posts, error:postsError } = useSWR(network.cid ? '/api/get-posts-for-network?cid=' + network.cid : null, fetcher);
  return (
    <Main active={'browse'}>
      <div className="flex flex-col justify-center mt-14">
        {network ?
        <>
        <h1 className="text-center text-3xl font-bold">Posts</h1>
        <h3 className="text-center text-xl font-semibold mt-3">{network.name}</h3>
        <div className="flex justify-center">
          <GenericButton action={() => router.push('/networks')}>Change network</GenericButton>
        </div>
        <div className="grid grid-cols-1 mt-5">
          {posts == undefined ?
          <BrowseSkeleton/>:
          <>
          {posts.map((el, index) => (
            <Post sliceAmount={200} postData={el} key={index}/>
          ))}
          </>}
        </div>
        </>
        : null}
      </div>
    </Main>
  )
}
