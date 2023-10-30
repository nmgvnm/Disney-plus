import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  console.log("query:", query);
  const searchTerm = query.get("q");
  console.log("searchTerm:", searchTerm);
  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(request.data.results);
      console.log("request:", request);
    } catch (error) {
      console.log("error", error);
    }
  };

  return <div>SearchPage</div>;
};

export default SearchPage;
