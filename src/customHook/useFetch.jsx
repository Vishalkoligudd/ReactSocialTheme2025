import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (method, url, body = null) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const options = {
        method,
        url,
        headers: {
          "Content-type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        ...(body && { data: body }),
      };
      const response = await axios(options);
      console.log(response.data);
      setData(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error, data };
};

export default useFetch;
