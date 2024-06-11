import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import axios from "@/src/lib/axios";
import Spinner from "@/src/components/Spinner/Spinner";
import { isMobileDevice } from "@/src/utils/isMobileDevice";

import styles from "./CreateArticle.module.scss";
import plusIcon from "@/public/svgs/plus.svg";

interface FormValues {
  title: string;
  content: string;
  image: File | null;
}

export default function CreateArticle() {
  const url = `/articles`;

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    content: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("content", formValues.content);
      if (formValues.image) {
        formData.append("image", formValues.image);
      }
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormValues({ title: "", content: "", image: null });
      setImagePreview(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, title: e.target.value });
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, content: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormValues({ ...formValues, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setFormValues({ ...formValues, image: null });
    setImagePreview(null);
  };

  const isButtonDisabled =
    formValues.title.trim() === "" ||
    formValues.content.trim() === "" ||
    isLoading;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.headerTitle}>게시글 쓰기</div>

        {isLoading ? (
          <Spinner />
        ) : (
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isButtonDisabled}
          >
            등록
          </button>
        )}
        {error && <div>{error}</div>}
      </div>

      <div className={styles.titleInputSection}>
        <div className={styles.sectionTitle}>*제목</div>
        <input
          className={styles.titleInput}
          type="text"
          value={formValues.title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요."
          required
        />
      </div>

      <div className={styles.contentInputSection}>
        <div className={styles.sectionTitle}>*내용</div>
        <textarea
          className={styles.contentInput}
          value={formValues.content}
          onChange={handleContentChange}
          placeholder="내용을 입력하세요."
          required
        />
      </div>

      <div className={styles.imageInputSection}>
        <div className={styles.sectionTitle}>이미지</div>
        <div className={styles.addImageSection}>
          <div className={styles.addImage}>
            <label htmlFor="file" className={styles.plusButton}>
              <Image
                src={plusIcon}
                alt="플러스 아이콘"
                width={48}
                height={48}
              />
            </label>
            <div>이미지 등록</div>
          </div>

          <input type="file" id="file" onChange={handleImageChange} />
          {imagePreview && (
            <div className={styles.previewImageSection}>
              <Image
                className={styles.previewImage}
                src={imagePreview}
                alt="등록한 이미지 미리보기"
                width={282}
                height={282}
              />
              <button className={styles.xButton} onClick={handleImageDelete}>
                x
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
