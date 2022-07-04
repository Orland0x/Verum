import Main from '../../components/Layout';
import PostDetailSkeleton from '../../components/Skeletons/PostDetailSkeleton';
import PostDetail from '../../components/Content/PostDetail';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then(async (res) => await res.json())

export default function Browse() {
  const router = useRouter();
  const { slug } = router.query;
  const { data:post, error:postError } = useSWR(slug ? '/api/getPost?id=' + slug : null, fetcher);
  const { data:comments, error:commentsError } = useSWR(slug ? '/api/comments?id=' + slug : null, fetcher);

  function refreshComments() {
    mutate(slug ? '/api/comments?id=' + slug : null);
  }

  return (
    <Main>
      {post == undefined || post.profile == undefined ?
      <PostDetailSkeleton/>:
      <PostDetail postData={post} commentData={comments} refresh={refreshComments}/>
      }
    </Main>
  )
}
