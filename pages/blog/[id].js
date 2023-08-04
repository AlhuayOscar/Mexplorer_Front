import React, { useState } from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import Footer from "@/components/Footer";
import { Blog } from "@/models/Blog";
import { Tour } from "@/models/Tour";
import { Settings } from "@/models/Settings";
import Center from "@/components/Center";
import Image from "next/image";
import TourBoxBlog from "@/components/TourBoxBlogs";
import BlogDate from "@/components/BlogDate";
import Link from "next/link";
import FollowUs from "@/components/FollowUs";



const BlogContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  `;

  const BlogTitle = styled.div`
    background-color: #84c441;
    color: #fff;
    font-size: 40px;
    width: 100%;
    /* padding: 20px; */
    h1{
      margin: 20px 0;
      font-size: 1.4rem;
      font-weight: 400;
      @media screen and (min-width: 768px) {
      font-size: 3rem;
    }
    }
  `;

const ImageContainer = styled.div`
/* border: 2px solid red; */
width: 100%;
overflow: hidden;
height: auto;

@media screen and (min-width: 768px) {
    height: 20rem;
    width: auto;
  }
img{
  width: 100%;
  height: auto;
  object-fit: cover;
  min-height: 250px;
  max-height: 400px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    height: 100%;
    width: auto;
  }
}
`;

const BlogSection = styled.section`
  display: grid;
  gap: 80px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 3fr auto;
  }
`;


const BlogDescription = styled.div`
  /* max-width: 750px; */
  line-height: 1.5;
  text-align: justify;
  color: #1a1a1a;
  font-size: 1rem;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    p{
      padding-bottom: 5px;
      line-height: 1.9;
    }
  }
  &:first-of-type::first-letter {
    font-size: 2.4em;
    color: #84c441;
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

const InfoSetionn = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  background-color: #fff;
  height: 120%;
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #84c441;
  }
  

  @media screen and (min-width: 768px) {
    padding: 30px 20px 0 20px;
  }
`;

const BlogLink = styled(Link)`
  border: 2px solid #84c441;
  padding: 10px 30px;
  border-radius: 7px;
  background-color: #fff;
  color: #84c441;
  text-decoration: none;
  text-align: center;
  margin-top: 20px;
  &:hover {
    background-color: #699c34;
    color: #fff;
    border: 2px solid #699c34;
    scale: 1.02;
    transition: 0.5s ease-in-out;
  }
`;

const BlogPage = ({ blog, tours, urls }) => {

  console.log(urls)
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
        <ImageContainer>
          <Image 
            src={blog.images[0]}
            alt="Blog Image"
            height={420}
            width={420}
            sizes="(max-width: 768px) 100vw"
            onClick={handleImageClick}
          />
        </ImageContainer>
        <BlogTitle>
          <h1>{blog.title}</h1>
        </BlogTitle>
        <Center>
          <BlogSection>
            <BlogDescription>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {index === 0 ? (
                    paragraph ? (
                      <span>
                        {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
                      </span>
                    ) : null
                  ) : (
                    <span>{paragraph}</span>
                  )}
                </p>
              ))}
              <BlogDate date={blog.date}/>
            </BlogDescription>
          
          <InfoSetionn>
           <h2>Revisa nuestros últimos tours:</h2> 
            {tours?.map(tour => (
              <TourBoxBlog key={tour._id} {...tour}/>
            ))
            } 
            <BlogLink href={"/tours"}>
                Ver más
            </BlogLink>
            <FollowUs socialUrls={"social"}/>
          </InfoSetionn>

          
        </BlogSection>
        </Center>
      </BlogContainer>
      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent>
            <Image src={blog.images[0]} alt="Blog Image" height={500} width={500}/>
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
    const portadaUrls = await Settings.find({ urlName: "Portada" });
    console.log("Últimos 3 Tours:", tours); // Agregamos el console.log aquí
    return {
      props: {
        blog: JSON.parse(JSON.stringify(blog)),
        tours: JSON.parse(JSON.stringify(tours)),
        urls: JSON.parse(JSON.stringify(portadaUrls))
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
