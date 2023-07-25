import React, { useState } from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import Footer from "@/components/Footer";
import { Blog } from "@/models/Blog";
import { Tour } from "@/models/Tour";
import ToursGrid from "@/components/ToursGrid";

const BlogContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;
const BlogInfo = styled.div`
  display: flex;
`;
const BlogTitle = styled.h1`
  font-size: 40px;
`;

const BlogDescription = styled.div`
  max-width: 750px;
  font-size: x-large;
  color: #1a1a1a;
  text-align: left;
  &:first-of-type::first-letter {
    font-size: 3em;
    color: your-other-color;
  }
  span {
    width: 750px;
    word-wrap: break-word;
  }
`;

const ToursCards = styled.div``;
const ImageContainer = styled.div`
  height: 600px;
  margin-inline: 10px;
  overflow: hidden;
  @media (max-width: 1140px) {
    height: 400px; // Ajustar la altura para pantallas más pequeñas
  }

  @media (max-width: 800px) {
    height: 300px; // Ajustar la altura para pantallas más pequeñas
  }

  @media (max-width: 400px) {
    height: 200px; // Ajustar la altura para pantallas más pequeñas
  }
  @media (max-width: 300px) {
    height: 150px; // Ajustar la altura para pantallas más pequeñas
  }
`;

const BlogImage = styled.img`
  width: 100%; // Ajustar el ancho de la imagen al 100% del contenedor
  height: 100%; // Ajustar la altura de la imagen al 100% del contenedor
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 1140px) {
    width: 100%; // Ajustar el ancho de la imagen al 100% del contenedor
    height: 100%; // Ajustar la altura de la imagen al 100% del contenedor
  }

  @media (max-width: 600px) {
    width: 100%; // Ajustar el ancho de la imagen al 100% del contenedor
    height: 100%; // Ajustar la altura de la imagen al 100% del contenedor
  }

  @media (max-width: 290px) {
    width: 100%; // Ajustar el ancho de la imagen al 100% del contenedor
    height: 100%; // Ajustar la altura de la imagen al 100% del contenedor
  }
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

const BlogPage = ({ blog, tours }) => {
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
        <BlogInfo>
          <BlogDescription>
            {paragraphs.map((paragraph, index) => (
              <BlogDescription key={index}>
                {index === 0 ? (
                  paragraph ? (
                    <span>
                      {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
                    </span>
                  ) : null
                ) : (
                  <span>{paragraph}</span>
                )}
              </BlogDescription>
            ))}
          </BlogDescription>
        </BlogInfo>
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
