import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCards from "@/components/BlogCards";
import Header from "@/components/Header";
import styled, { keyframes } from "styled-components";
import Footer from "@/components/Footer";
import CancelIcon from "@mui/icons-material/Cancel";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const SearchContainer = styled.div`
  display: flex;
  padding-block: 20px;
  padding-inline: 10px;
  justify-content: end;
  max-width: 1130px;
  gap: 10px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  padding: 8px;
  padding-inline: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: 0.1s ease;

  &:focus {
    transition: 0.1s ease;
    border-color: #888;
    box-shadow: 0 0 5px #888;
  }

  &:hover {
    transform: scale(1.05);
    transition: 0.1s ease;
  }
`;

const bounceAnimation = keyframes`
  0% {
    transform: scale(1);
    transition: 0.2s ease;
  }
  50% {
    transform: scale(1.1);
    transition: 0.2s ease;
  }
  100% {
    transform: scale(1);
    transition: 0.2s ease;
  }
`;

const CleanSearch = styled.button`
  background-color: #fff;
  color: #1a1a1a;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: 0.2s ease;
  &:hover {
    transition: 0.2s ease;
    border-color: #888;
    box-shadow: 0 0 5px #888;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.1s ease;
  }

  &:active {
    animation: ${bounceAnimation} 0.6s;
  }
`;

const RecentSearchItem = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  background-color: #fff;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0 0 5px #888;
  transition: 0.5s ease;
  text-align: center;
  cursor: pointer;
  white-space: nowrap; /* Prevent line breaks */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Display ellipsis (...) for overflowed text */
  max-width: 17ch; /* Limit the maximum width to 10 characters */
  max-height: 24px;
  &:focus {
    transition: 0.1s ease;
    border-color: #888;
    box-shadow: 0 0 5px #888;
  }

  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease;
  }
`;

const RemoveSearchItem = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  cursor: pointer;
  transition: 0.2s ease;
  text-align: center;
  svg:hover {
    transform: scale(1.2);
    transition: 0.2s ease;
  }
`;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    fetchBlogs();
    loadRecentSearches();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs"); // Reemplaza con la ruta correcta de tu API
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRecentSearches = () => {
    const searches = localStorage.getItem("recentSearches");
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  };

  const saveRecentSearches = () => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      filterBlogs(searchTerm);
      updateRecentSearches(searchTerm);
    }
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    filterBlogs(term);
  };

  const handleRemoveRecentSearch = (term) => {
    const updatedSearches = recentSearches.filter((search) => search !== term);
    setRecentSearches(updatedSearches);
    saveRecentSearches();
  };

  const filterBlogs = (term) => {
    const filtered = blogs.filter((blog) => {
      const blogTitle = blog.title.toLowerCase();
      return blogTitle.includes(term.toLowerCase());
    });
    setFilteredBlogs(filtered);
  };

  const updateRecentSearches = (term) => {
    if (term && !recentSearches.includes(term)) {
      const updatedSearches = [...recentSearches, term];
      setRecentSearches(updatedSearches.slice(-5)); // Keep the last 5 searches
      saveRecentSearches();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <>
      <Header />
      <BlogContainer>
        <SearchContainer>
          {recentSearches.map((search, index) => (
            <RecentSearchItem
              key={index}
              onClick={() => handleRecentSearchClick(search)}
            >
              <RemoveSearchItem
                onClick={() => handleRemoveRecentSearch(search)}
              >
                <CancelIcon />
              </RemoveSearchItem>
              {search.split(" ")[0]}
            </RecentSearchItem>
          ))}
          <CleanSearch onClick={clearRecentSearches}>Limpiar</CleanSearch>
          <SearchInput
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleEnterKeyPress}
          />
        </SearchContainer>
        {searchTerm !== "" ? (
          <BlogCards blogs={filteredBlogs} />
        ) : (
          <BlogCards blogs={blogs} />
        )}
      </BlogContainer>
      <Footer />
    </>
  );
};

export default Blog;