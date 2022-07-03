import Post from '../Cards/Post';
import CommentCard from '../Cards/CommentCard';

export default function PostDetail() {
  return (
    <div className="mt-14">
      <Post/>
      <CommentCard/>
    </div>
  )
}
