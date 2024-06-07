import Image from "next/image";
import Link from "next/link";
import styles from "./BestArticle.module.scss";
import formatDate from "@/src/utils/formatDate";
import { Article } from "@/src/interfaces/Article.interface";
import heartIcon from "@/public/svgs/heart.svg";
import badgeIcon from "@/public/svgs/badge.svg";

export default function BestArticle({ article }: { article: Article }) {
  const articleImage = article.image || "";
  const createdAt = formatDate(article.createdAt);

  return (
    <div className={styles.article}>
      <Image src={badgeIcon} alt="베스트 게시글 배지" width={102} height={30} />

      <Link href={`/boards/${article.id}`}>
        <div className={styles.contentSection}>
          <div className={styles.title}>{article.title}</div>
          <div
            className={styles.image}
            style={{
              border:
                articleImage === "" ? "none" : "1px solid var(--grey-200)",
              backgroundColor:
                articleImage === "" ? "var(--grey-50)" : "var(--white)",
            }}
          >
            {articleImage && (
              <Image
                src={articleImage}
                alt="게시글 이미지"
                width={50}
                height={50}
              />
            )}
          </div>
        </div>
      </Link>

      <div className={styles.subContentSection}>
        <div className={styles.writerSection}>
          <div className={styles.nickname}>{article.writer.nickname}</div>
          <div className={styles.likeCount}>
            <Image src={heartIcon} alt="하트 아이콘" width={20} height={20} />
            {article.likeCount}
          </div>
        </div>
        <div className={styles.date}>{createdAt}</div>
      </div>
    </div>
  );
}
