import { useState, useEffect } from "react";
import axios from "@/src/lib/axios";
import { AxiosResponse } from "axios";

const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: AxiosResponse<T> = await axios.get(url);
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};

export default useFetchData;
