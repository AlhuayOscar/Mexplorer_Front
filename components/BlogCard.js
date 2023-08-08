import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import BlogDate from "./BlogDate";
import Image from "next/image";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const CardContainer = styled(Link)`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 2px 2px 4px #47556955;
  min-width: 320px;
  max-width: 390px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #000;

  /* @media (max-width: 400px) {
    width: 95%;
  } */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  height: 6rem;
  margin: 0;
  margin-top: 5px;
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


const BlogCard = ({ blog }) => {
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    const today = new Date();
    //console.log(today)
    const dateBlog = new Date(dayjs(blog.date).format("DD-MM-YYYY"));
    const dateDiff = (today - dateBlog) / (1000 * 60 * 60 * 24);
    if (dateDiff < 8) setIsNew(true)
  }, [])



  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncated = text.substring(0, maxLength);
      const lastSpaceIndex = truncated.lastIndexOf(" ");
      return lastSpaceIndex !== -1 ? truncated.substring(0, lastSpaceIndex) + "..." : truncated + "...";
    }
  };

  const truncateAndTranslateDescription = (description, descriptionEng, maxLength, currentLanguage) => {
    const combinedDescription = currentLanguage === 'es' ? description : descriptionEng;

    if (!combinedDescription) {
      return '';
    }

    return truncateText(combinedDescription, maxLength);
  };


  // Cambia el idioma con i18n
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
  }, [currentLanguage]);

  // Se Obtiene los valores en español e inglés basados en el idioma actual
  const displayTitle = currentLanguage === 'es' ? blog.title : blog.titleEng;
  const displaySubtitle = currentLanguage === 'es' ? blog.subtitle : blog.subtitleEng;
  const truncatedDescription = truncateAndTranslateDescription(blog.description, blog.descriptionEng, 160, currentLanguage);




  return (
    <CardContainer href={`/blog/${blog._id}`} passHref>
      <ImageBox>
        <Image src={blog.images[0]} alt="Blog Image" width={350} height={290} />
        <SpanStyled new={isNew ? 'new' : ''}>{isNew ? 'Nuevo Blog' : 'Blog'}</SpanStyled>
      </ImageBox>
      <Title>{displayTitle}</Title>
      <Subtitle>{displaySubtitle}</Subtitle>
      <Description>{truncatedDescription}</Description>
      <BlogDate date={blog.date} padding />
    </CardContainer>
  );
};

export default BlogCard;
