import React from "react";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 0 5px #888;
  width: 350px;
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
const BlogDate = styled.span`
  text-align: start;

  p {
    padding-inline: 20px;
    display: flex;
    align-items: center;
    gap: 3px;
  }
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

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

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
    <CardContainer>
      <Image src={blog.images[0]} alt="Blog Image" />
      <Title>{blog.title}</Title>
      <BlogDate>
        <p>
          <CalendarMonthIcon />
          {formatDate(blog.date)}
        </p>
      </BlogDate>
      <Subtitle>{blog.subtitle}</Subtitle>
      <Description>{truncatedDescription}</Description>
    </CardContainer>
  );
};

export default BlogCard;
