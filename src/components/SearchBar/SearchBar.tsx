import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./SearchBar.module.scss";
import searchIcon from "@/public/svgs/search.svg";

interface SearchBarProps {
  keyword: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // 디바운싱을 위한 useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 2000); // 2초 딜레이가 지난 후 조회 API 호출

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // 디바운싱된 검색어가 변경될 때 keyword 함수 호출
  useEffect(() => {
    if (debouncedSearchTerm) {
      keyword(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, keyword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    keyword(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.searchIcon}>
        <Image src={searchIcon} alt="검색 아이콘" width={24} height={24} />
      </div>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
