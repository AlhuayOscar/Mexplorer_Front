import React from "react";
import styled from "styled-components";
import BlogCard from "@/components/BlogCard";

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 23rem), 1fr));
  gap: 2rem 1rem;
  place-items: center;
`;

const BlogCards = ({ blogs }) => {
  return (
    <CardsContainer>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </CardsContainer>
  );
};

export default BlogCards;
