import axios from "axios";
import { useState, useEffect } from "react";

const useFetchAxios = (baseUrl) => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setErrorMsg(null);
        }
      } catch (err) {
        if (isMounted) {
          setErrorMsg(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
        // isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData(baseUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [baseUrl]);

  return { data, errorMsg, isLoading };
};

export default useFetchAxios;
