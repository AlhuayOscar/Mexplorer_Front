import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCards from "@/components/BlogCards";
import Header from "@/components/Header";
import styled, { keyframes } from "styled-components";
import Footer from "@/components/Footer";
import CancelIcon from "@mui/icons-material/Cancel";
import { Loader } from "react-spinner"; // Importa el componente Loader de react-spinner
import PaginationControls from "@/components/Pagination";
import Center from "@/components/Center";
import { useTranslation } from "react-i18next";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ImageBox = styled.div`
  background: url("https://res.cloudinary.com/dipn8zmq3/image/upload/v1690990359/Tours_Background_Optimized_fovkvm.webp")
    no-repeat center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 18rem;
  text-align: center;
  margin: auto;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Agregado efecto de sombra de texto */
  padding: 0 40px;
  margin-bottom: 20px;
  /* position: relative; */
  img {
    width: 100%;
    height: 140%;
  }

  h2 {
    font-size: 6rem;
    color: #fff;
    vertical-align: middle;
    font-weight: 400;
    margin: 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  padding-block: 20px;
  padding-inline: 10px;
  justify-content: end;
  margin-bottom: 40px;
  overflow: hidden;
  width: 100%;
  align-items: center;
`;

/* const SearchInput = styled.input`
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
`; */

const Input = styled.input`
  flex: 1;
  border-radius: 5px 0 0 5px;
  padding: 12px 20px;
  border-width: 2px 0 2px 2px;
  border-style: solid;
  border-color: #ccc;
  outline: none;
  max-width: 20rem;
  min-width: 8rem;
`;

const SubmitButton = styled.button`
  background-color: #00abbd;
  color: white;
  border-radius: 0px 5px 5px 0px;
  padding: 14px 16px;
  border: none;
  outline: none;
  cursor: pointer;
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

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
  margin: 0 auto;
`;
const Blog = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la animación de carga
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastBlog = currentPage * postsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - postsPerPage;
  const currentBlogs = isLoading
    ? []
    : searchTerm !== ""
    ? filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
    : blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs"); // Reemplaza con la ruta correcta de tu API
      setBlogs(response.data);
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false after data is fetched
      }, 400);
    } catch (error) {
      console.error(error);
      git;
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      filterBlogs(searchTerm);
    }
  };

  const handleClick = () => {
    filterBlogs(searchTerm);
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    filterBlogs(term);
  };

  const handleRemoveRecentSearch = (term) => {
    saveRecentSearches();
  };

  const filterBlogs = (term) => {
    const filtered = blogs.filter((blog) => {
      const blogTitle = blog.title.toLowerCase();
      return blogTitle.includes(term.toLowerCase());
    });
    setFilteredBlogs(filtered);
  };

  const clearRecentSearches = () => {
    setSearchTerm("");
    fetchBlogs();
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    const totalPages = Math.ceil(
      searchTerm !== ""
        ? filteredBlogs.length / postsPerPage
        : blogs.length / postsPerPage
    );
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calcular totalPages para los blogs filtrados
  const totalPagesFiltered = Math.ceil(filteredBlogs.length / postsPerPage);
  // Calcular totalPages para los blogs sin filtrar
  const totalPagesUnfiltered = Math.ceil(blogs.length / postsPerPage);
  // Total de páginas dependiendo del caso (filtrado o sin filtrar)
  const totalPages =
    searchTerm !== "" ? totalPagesFiltered : totalPagesUnfiltered;

  useEffect(() => {
    setCurrentPage(1); // página 1 al cambiar el nombre de búsqueda
  }, [searchTerm]);

  return (
    <>
      <Header />
      <ImageBox loading="lazy">
        <h2>Blogs</h2>
      </ImageBox>
      <Center>
        <SearchContainer>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleEnterKeyPress}
          />
          <SubmitButton type="submit" onClick={handleClick}>
            Buscar
          </SubmitButton>
        </SearchContainer>
        <BlogContainer>
          {isLoading ? (
            <LoadingSpinner />
          ) : searchTerm !== "" ? (
            <BlogCards blogs={currentBlogs} />
          ) : (
            <BlogCards blogs={currentBlogs} />
          )}
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
              disablePreviousPage={currentPage === 1}
              disableNextPage={currentPage === totalPages}
            />
          )}
        </BlogContainer>
      </Center>
      <Footer />
    </>
  );
};

export default Blog;
