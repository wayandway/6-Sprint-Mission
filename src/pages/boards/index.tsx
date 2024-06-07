import ArticleList from "@/src/containers/boards/Article/ArticleList";
import BestArticleList from "@/src/containers/boards/BestArticle/BestArticleList";

export default function BoardPage() {
  return (
    <>
      <BestArticleList />
      <ArticleList />
    </>
  );
}
