import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components";
import Link from "next/link";
import BlogDate from "./BlogDate";
import Image from "next/image";
import dayjs from "dayjs";

const CardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 2px 2px 4px #47556955;
  min-width: 350px;
  max-width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;


  /* @media (max-width: 400px) {
    width: 95%;
  } */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  padding: 20px;
  color: #00abbd;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 5px 20px;
  text-align: left;
  max-height: 20px;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 16px;
  padding-inline: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  text-align: justify;
  margin: 0;
`;

const ImageBox = styled.div`
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 250px;

img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(
    0.4px
  ); 
}

`;

const SpanStyled = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: #00abbd;
  border-radius: 7px;
  color: #fff;
  ${props => props.new && css`
    background-color: #eeb547;
  `}
`;

const GlobalLinkStyles = styled.a`
  text-decoration: none;
  color: inherit;
`;

const BlogCard = ({ blog }) => {

  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    const today = new Date();
    console.log(today)
    const dateBlog = new Date(dayjs(blog.date).format("DD-MM-YYYY"));
    const dateDiff = (today - dateBlog) / (1000 * 60 * 60 * 24);
    if(dateDiff < 30) setIsNew(true)
  },[])

  

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
        <ImageBox>
          <Image src={blog.images[0]} alt="Blog Image" width={350} height={290}/> 
          <SpanStyled new={isNew ? 'new' : ''}>{isNew ? 'Nuevo Blog' : 'Blog'}</SpanStyled>
        </ImageBox>
        <Title>{blog.title}</Title>
        <Subtitle>{blog.subtitle}</Subtitle>
        <Description>{truncatedDescription}</Description>
        <style jsx global>{`
          a {
            text-decoration: none;
            color: inherit;
          }
          `}</style>
          <BlogDate date={blog.date} padding/>
      </CardContainer>
    </Link>
  );
};

export default BlogCard;
