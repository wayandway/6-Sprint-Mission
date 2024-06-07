import { useState, useEffect, useMemo } from "react";
import useFetchData from "@/src/hooks/useFetchData";
import { ArticleListResponse } from "@/src/interfaces/Article.interface";
import BestArticle from "./BestArticle";
import Spinner from "@/src/components/Spinner/Spinner";
import styles from "./BestArticle.module.scss";

const getPageSize = () => {
  if (typeof window === "undefined") {
    // 서버사이드 렌더링 시 기본값 반환
    return 3;
  }

  const width = window.innerWidth;
  if (width < 768) return 1;
  else if (width < 1280) return 2;
  else return 3;
};

export default function BestArticleList() {
  const [pageSize, setPageSize] = useState<number>(getPageSize());

  const url = useMemo(
    () => `articles?page=1&pageSize=${pageSize}&orderBy=like`,
    [pageSize]
  );

  const fetchArticles = useFetchData<ArticleListResponse>(url);
  const { data: ArticleList, isLoading } = fetchArticles;

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (ArticleList?.totalCount === 0) {
    return <>게시글이 없습니다.</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>베스트 게시글</div>

      <div className={styles.articlesSection}>
        {ArticleList?.list?.map((article) => (
          <BestArticle article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
}
