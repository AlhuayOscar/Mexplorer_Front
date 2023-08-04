import React from "react";
import styled from "styled-components";
import Link from "next/link";
import BlogDate from "./BlogDate";

const CardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 2px 2px 4px #47556955;
  width: 350px;
  height: 525px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  min-height: 60px;
  color: #103f54;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  text-align: center;
  max-height: 20px;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 16px;
  padding-inline: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  max-height: 200px;
  object-fit: cover;
  filter: blur(
    0.4px
  ); /* Puedes ajustar el valor de blur según tus preferencias */
`;

const GlobalLinkStyles = styled.a`
  text-decoration: none;
  color: inherit;
`;

const BlogCard = ({ blog }) => {

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncated = description.substring(0, maxLength);
      const lastSpaceIndex = truncated.lastIndexOf(" ");
      return truncated.substring(0, lastSpaceIndex) + "...";
    }
  };

  const truncatedDescription = truncateDescription(blog.description, 160);

  return (
    <Link href={`/blog/${blog._id}`} passHref>
      <CardContainer>
        <Image src={blog.images[0]} alt="Blog Image" />
        <Title>{blog.title}</Title>
        <BlogDate date={blog.date}padding/>
        <Subtitle>{blog.subtitle}</Subtitle>
        <Description>{truncatedDescription}</Description>
        <style jsx global>{`
          a {
            text-decoration: none;
            color: inherit;
          }
        `}</style>
      </CardContainer>
    </Link>
  );
};

export default BlogCard;
