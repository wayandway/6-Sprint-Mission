import { useState, useMemo } from "react";
import Link from "next/link";
import useFetchData from "@/src/hooks/useFetchData";
import { ArticleListResponse } from "@/src/interfaces/Article.interface";
import Article from "./Article";
import DropDown from "@/src/components/DropDown/DropDown";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import Spinner from "@/src/components/Spinner/Spinner";
import Button from "@/src/components/Button/Button";
import styles from "./Article.module.scss";

export default function ArticleList() {
  const [orderBy, setOrderBy] = useState("recent");
  const [searchTitle, setSearchTitle] = useState("");

  const url = useMemo(() => {
    let baseUrl = `articles?page=1&pageSize=10&orderBy=${orderBy}`;
    if (searchTitle) {
      baseUrl += `&keyword=${searchTitle}`;
    }
    return baseUrl;
  }, [orderBy, searchTitle]);

  const fetchArticles = useFetchData<ArticleListResponse>(url);
  const { data: ArticleList, isLoading } = fetchArticles;
  const orderOptions = {
    최신순: "recent",
    인기순: "like",
  };

  const handleOrderBy = (orderByOption: string) => {
    setOrderBy(orderByOption);
  };
  const handleSearchTitle = (searchKeyword: string) => {
    setSearchTitle(searchKeyword);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (ArticleList?.totalCount === 0) {
    return (
      <>
        <SearchBar keyword={handleSearchTitle} />
        <br />
        게시글이 없습니다.
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerTitleSection}>
        <div className={styles.containerTitle}>게시글</div>

        <Link href="/boards/create">
          <Button>글쓰기</Button>
        </Link>
      </div>

      <div className={styles.controlSection}>
        <SearchBar keyword={handleSearchTitle} />
        <DropDown options={orderOptions} setOption={handleOrderBy} />
      </div>

      <div>
        {ArticleList?.list?.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
}
