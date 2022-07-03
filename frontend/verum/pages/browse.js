import Main from '../components/Layout';
import BrowseSkeleton from '../components/Skeletons/BrowseSkeleton';
import Post from '../components/Cards/Post';

export default function Browse() {
  const data = [0,1];
  return (
    <Main active={'browse'}>
      <div className="flex flex-col justify-center mt-14">
        <h1 className="text-center text-3xl font-bold">Posts</h1>
        <div className="grid grid-cols-3 mt-5 gap-4">
          {data == null ?
          <BrowseSkeleton/>:
          <>
          {data.map((el, index) => (
            <Post sliceAmount={200} key={index}/>
          ))}
          </>}
        </div>
      </div>
    </Main>
  )
}
