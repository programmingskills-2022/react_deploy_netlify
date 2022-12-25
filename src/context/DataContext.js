import { useState, useEffect, createContext } from "react";
import useFetchAxios from "../hooks/useFetchAxios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const { data, errorMsg, isLoading } = useFetchAxios(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
    // const fetchPosts = async () => {
    //   try {
    //     const response = await api.get("/posts");
    //     if (response && response.data) {
    //       setPosts(response.data);
    //       //console.log(response.data);
    //     }
    //   } catch (err) {
    //     if (err.response) {
    //       console.log(err.response.data);
    //       console.log(err.response.status);
    //       console.log(err.response.headers);
    //     } else console.log(`Error: ${err.message}`);
    //   }
    // };
    // fetchPosts();
  }, [data]);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filteredPosts.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        posts,
        setPosts,
        filteredPosts,
        isLoading,
        errorMsg,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
