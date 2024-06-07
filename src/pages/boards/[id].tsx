import AddComment from "@/src/containers/boards-detail/AddComment/AddComment";
import ArticleDetail from "@/src/containers/boards-detail/ArticleDetail/ArticleDetail";
import Comment from "@/src/containers/boards-detail/Comment/Comment";

export default function ArticlePage() {
  return (
    <>
      <ArticleDetail />

      <AddComment />
      <Comment />
    </>
  );
}
