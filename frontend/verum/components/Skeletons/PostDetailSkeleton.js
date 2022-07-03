import PostSkeleton from './PostSkeleton';
import CommentFieldSkeleton from './CommentFieldSkeleton';
import CommentSkeleton from './CommentSkeleton';

export default function PostDetailSkeleton() {
  return (
    <div className="mt-14">
      <PostSkeleton/>
      <CommentFieldSkeleton/>
      <CommentSkeleton/>
      <CommentSkeleton/>
    </div>
  )
}
