import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./ArticleDetail.module.scss";
import useFetchData from "@/src/hooks/useFetchData";
import formatDate from "@/src/utils/formatDate";
import { Article } from "@/src/interfaces/Article.interface";
import Spinner from "@/src/components/Spinner/Spinner";
import defaultProfileIcon from "@/public/svgs/default-profile.svg";
import heartIcon from "@/public/svgs/heart.svg";
import kebabIcon from "@/public/svgs/kebab.svg";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const url = `/articles/${id}`;
  const fetchArticle = useFetchData<Article>(url);
  const { data: article, isLoading } = fetchArticle;
  const articleImage = article?.image || "";

  if (isLoading) {
    return <Spinner />;
  }

  if (article === undefined) {
    return <>게시글이 없습니다.</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <div className={styles.title}>{article.title}</div>
        <Image src={kebabIcon} width={24} height={24} alt="케밥 아이콘" />
      </div>

      <div className={styles.writerSection}>
        <Image
          src={defaultProfileIcon}
          alt="기본 프로필 이미지"
          width={24}
          height={24}
        />
        <div className={styles.nickname}>{article.writer.nickname}</div>
        <div className={styles.date}>{formatDate(article.createdAt)}</div>
        <div className={styles.vectorBar}>|</div>
        <div className={styles.likeCount}>
          <Image src={heartIcon} alt="하트 아이콘" width={20} height={20} />
          {article.likeCount}
        </div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.contentSection}>
        <div className={styles.content}>{article.content}</div>

        <div
          className={styles.image}
          style={{
            display: articleImage === "" ? "none" : "block",
          }}
        >
          {articleImage && (
            <Image
              src={articleImage}
              alt="게시글 이미지"
              width={282}
              height={282}
            />
          )}
        </div>
      </div>
    </div>
  );
}
