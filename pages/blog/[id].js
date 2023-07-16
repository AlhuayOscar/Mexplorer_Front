import React, { useState } from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import Footer from "@/components/Footer";
import { Blog } from "@/models/Blog";

const BlogContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const BlogTitle = styled.h1`
  color: your-color;
`;

const ImageContainer = styled.div`
  height: 600px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 1130px;
  max-width: none;
  height: 600px;
  object-fit: cover;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  max-height: 90%;
`;

const ModalImage = styled.img`
  width: 75vw;
  height: 75vh;
  object-fit: contain;
`;

const BlogDescription = styled.p`
  margin-bottom: 20px;
  max-width: 1130px;
  color: #1a1a1a;

  &:first-of-type::first-letter {
    font-size: 3em;
    color: your-other-color;
  }
`;

const BlogPage = ({ blog }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const paragraphs = blog.description.split("\n");

  return (
    <>
      <Header />
      <BlogContainer>
        <BlogTitle>{blog.title}</BlogTitle>
        <ImageContainer>
          <BlogImage
            src={blog.images[0]}
            alt="Blog Image"
            onClick={handleImageClick}
          />
        </ImageContainer>
        {paragraphs.map((paragraph, index) => (
          <BlogDescription key={index}>
            {index === 0 ? (
              <span>
                {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
              </span>
            ) : (
              <span>{paragraph}</span>
            )}
          </BlogDescription>
        ))}
        {/* Resto del contenido de la página del blog */}
      </BlogContainer>
      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent>
            <ModalImage src={blog.images[0]} alt="Blog Image" />
          </ModalContent>
        </ModalOverlay>
      )}
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const blog = await Blog.findById(id).exec();

    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog: JSON.parse(JSON.stringify(blog)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default BlogPage;
