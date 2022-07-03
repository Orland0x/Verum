import Main from '../../components/Layout';
import PostDetailSkeleton from '../../components/Skeletons/PostDetailSkeleton';
import PostDetail from '../../components/Content/PostDetail';

export default function Browse() {
  const data = "null";
  return (
    <Main>
      {data == null ?
      <PostDetailSkeleton/>:
      <PostDetail/>
      }
    </Main>
  )
}
