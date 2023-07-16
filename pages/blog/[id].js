import Header from "@/components/Header";
import styled, { keyframes } from "styled-components";
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

const BlogImage = styled.img`
  max-width: 25%;
  height: 25%;
  object-fit: cover;
`;

const BlogDescription = styled.p`
  margin-bottom: 20px;
  max-width: 1130px;
  color: #1a1a1a;
  &::first-letter {
    font-size: 3em; /* Cambia el tamaño de la primera letra */
    color: your-other-color; /* Cambia el color de la primera letra */
  }
`;

const BlogPage = ({ blog }) => {
  return (
    <>
      <Header />
      <BlogContainer>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogImage src={blog.images[0]} alt="Blog Image" />
        <BlogDescription>{blog.description}</BlogDescription>
        {/* Resto del contenido de la página del blog */}
      </BlogContainer>
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
