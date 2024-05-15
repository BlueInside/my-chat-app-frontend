import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, axiosParams) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(url, axiosParams);
        setData(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Optional: Clean-up function if needed
    return () => {
      // Cancel the Axios request here if the component unmounts
      axios.CancelToken.source().cancel('Component unmounted.');
    };
  }, [url, axiosParams]);

  return { data, error, loading };
};

export default useAxios;
