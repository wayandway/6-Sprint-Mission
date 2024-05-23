import ItemCard from "./ItemCard";
import { getProducts } from "../../../services/api";
import { useEffect, useState } from "react";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) return 1;
  else if (width < 1280) return 2;
  else return 4;
};

function BestItems() {
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const fetchData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchData({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <div className="best-item-container">
      <h1 className="container-title">베스트 상품</h1>
      <div className="best-item-list">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItems;
