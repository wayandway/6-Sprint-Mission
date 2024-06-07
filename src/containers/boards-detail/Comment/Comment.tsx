import Image from "next/image";
import { useRouter } from "next/router";
import useFetchData from "@/src/hooks/useFetchData";
import styles from "./Comment.module.scss";
import { CommentListResponse } from "@/src/interfaces/Comment.interface";
import Spinner from "@/src/components/Spinner/Spinner";
import formatDate from "@/src/utils/formatDate";

import kebabIcon from "@/public/svgs/kebab.svg";
import defaultProfileIcon from "@/public/svgs/default-profile.svg";

export default function Comment() {
  const router = useRouter();
  const { id } = router.query;
  const url = `/articles/${id}/comments?limit=3`;

  const fetchComments = useFetchData<CommentListResponse>(url);
  const { data: comments, isLoading } = fetchComments;

  if (isLoading) {
    return <Spinner />;
  }

  if (comments === undefined) {
    return <>댓글이 없습니다.</>;
  }

  return (
    <div className={styles.container}>
      {comments?.list?.map((comment) => (
        <>
          <div className={styles.contentSection}>
            <div className={styles.content}>{comment.content}</div>
            <Image src={kebabIcon} width={24} height={24} alt="케밥 아이콘" />
          </div>

          <div className={styles.writerSection}>
            <Image
              src={defaultProfileIcon}
              alt="기본 프로필 이미지"
              width={32}
              height={32}
            />
            <div className={styles.writer}>
              <div className={styles.nickname}>{comment.writer.nickname}</div>
              <div className={styles.createdAt}>
                {formatDate(comment.createdAt)}
              </div>
            </div>
          </div>

          <hr className={styles.hr} />
        </>
      ))}
    </div>
  );
}
