import React, { useState } from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import Footer from "@/components/Footer";
import { Blog } from "@/models/Blog";
import { Tour } from "@/models/Tour";
import TimeIcon from "@mui/icons-material/AccessTime";

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
  overflow: hidden;
  @media (max-width: 1140px) {
    height: 250px; // Ajustar la altura para pantallas más pequeñas
  }

  @media (max-width: 800px) {
    height: 250px; // Ajustar la altura para pantallas más pequeñas
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
const BlogSection = styled.section`
  display: flex;
`;
const PromoTitle = styled.div`
  background-color: #ee2743;
  padding: 3px 3px;
  color: #1f2937;
  text-decoration: none;
  color: #fff;
  transform: translateX(6rem) translateY(-13.2rem) rotate(45deg);
`;

const BlogInfoTours = styled.div`
  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  ul {
    list-style: none;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 300px;
    max-height: 250px;
    object-fit: cover;
  }

  strong {
    padding: 0.5rem 1.2rem;
    background-color: #d4d4d4bb;
    font-weight: 300;
    font-size: 1rem;
    color: #1f2937;
    text-decoration: none;
    margin: 0;
    position: absolute;
    transform: translateX(-18.8rem) translateY(1rem);
  }

  .tour-info {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 10px;
  }

  .time-box {
    display: flex;
    align-items: center;
    color: #888888;
    font-size: 1rem;
    font-weight: 600;
    margin-left: 0.5rem;
  }

  .time-icon {
    color: #888888;
  }

  .review {
    font-size: 1rem;
    font-weight: 400;
    margin: 8px 0;
    justify-items: end;
    align-self: start;
  }

  .prices {
    text-align: right;
  }

  .price {
    display: inline;
    font-size: 1.2rem;
    text-align: right;
  }

  .promo {
    color: #ee2743;
    display: inline-block;
    margin-right: 10px;
    font-size: 1.2rem;
  }

  .description {
    font-size: 0.8rem;
    text-align: left;
    height: 1.9rem;
  }

  @media screen and (min-width: 768px) {
    .time-box {
      font-size: 1.2rem;
    }

    .review {
      font-size: 1.2rem;
    }

    .price {
      font-size: 1.4rem;
    }

    .promo {
      font-size: 1rem;
    }

    .description {
      font-size: 0.9rem;
      height: 2.5rem;
    }
  }
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
        <BlogSection>
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
          <BlogInfoTours>
            <ul>
              <h2>Revisa nuestros últimos tours:</h2>
              {tours.map((tour) => (
                <li key={tour._id}>
                  <ImageContainer>
                    <BlogImage src={tour.images[0]} alt="Tour Image" />
                    <strong>{tour.name}</strong>
                    {tour.promo && <PromoTitle>¡Promo Exclusiva!</PromoTitle>}
                  </ImageContainer>
                  <div className="tour-info">
                    <div className="prices">
                      {tour.withoutPromoPrice && (
                        <span className="promo">${tour.withoutPromoPrice}</span>
                      )}
                      <span className="price">${tour.price}USD</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </BlogInfoTours>
        </BlogSection>
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
    const tours = await Tour.find({}).sort({ _id: -1 }).limit(3).exec();
    console.log("Últimos 3 Tours:", tours); // Agregamos el console.log aquí
    return {
      props: {
        blog: JSON.parse(JSON.stringify(blog)),
        tours: JSON.parse(JSON.stringify(tours)),
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
