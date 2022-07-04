import Post from '../Cards/Post';
import CommentCard from '../Cards/CommentCard';

export default function PostDetail({ postData, commentData, refresh }) {
  return (
    <div className="mt-14">
      <Post postData={postData}/>
      <CommentCard postID={postData.id} refresh={refresh}/>
      {commentData != undefined && commentData.map((el, index) => (
        <Post key={index} postData={el} suppressClick={true}/>
      ))}
    </div>
  )
}
