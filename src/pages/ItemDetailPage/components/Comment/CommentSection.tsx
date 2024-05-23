import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments } from "../../../../services/api";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

function CommentSection() {
  const [commentList, setCommentList] = useState([]);

  const { productId } = useParams();
  const fetchData = async () => {
    const comments = await getComments(productId);
    setCommentList(comments.list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="comment-section">
      <AddComment />
      {commentList?.map((comment) => (
        <CommentList comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentSection;
