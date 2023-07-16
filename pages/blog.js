import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs"); // Cambia la ruta "/api/blogs" por la ruta correcta de tu API para obtener los blogs
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <h3>{blog.subtitle}</h3>
          <p>{blog.description}</p>
          {blog.images.map((image, index) => (
            <img key={index} src={image} alt={`Imagen ${index + 1}`} />
          ))}
          <p>{blog.date}</p>
          <p>{blog.location}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogComponent;
