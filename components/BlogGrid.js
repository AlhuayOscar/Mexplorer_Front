import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCards from "@/components/BlogCards";
import Header from "@/components/Header";
import styled from "styled-components";
import Footer from "@/components/Footer";
import { Loader } from "react-spinner"; // Importa el componente Loader de react-spinner
import PaginationControls from "@/components/Pagination";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;

  margin: 0 auto;
`;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la animación de carga

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
    }
  };

  // Obtener los últimos 3 blogs
  const lastThreeBlogs = blogs.slice(-3);

  return (
    <>
      <BlogContainer>
        {isLoading ? <LoadingSpinner /> : <BlogCards blogs={lastThreeBlogs} />}
      </BlogContainer>
    </>
  );
};

export default Blog;
