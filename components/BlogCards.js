import React from "react";
import styled from "styled-components";
import BlogCard from "@/components/BlogCard";

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
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
