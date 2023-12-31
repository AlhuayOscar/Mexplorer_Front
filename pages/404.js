import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";

const CenterNoFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  height: 70vh;
`;

const ImageContainer = styled.div`
  width: 100%;
  object-fit: cover;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const BackHome = styled(Link)`
  background-color: #ee2743;
  padding: 10px 30px;
  border-radius: 7px;
  color: #fff;
  text-decoration: none;
  margin: 20px auto;
  &:hover {
    background-color: #cd233a;
    scale: 1.08;
  }
`;

export default function NotFound() {
  return (
    <>
      <Header />
      <CenterNoFound>
        <ImageContainer>
          <Image src={'https://res.cloudinary.com/dipn8zmq3/image/upload/v1691283958/png-error_alt_mexplorer_2_base_xf8h2c.png'} alt='image no found' width={700} height={450}/>
        </ImageContainer>
        <BackHome href="/">Return to Home</BackHome>
      </CenterNoFound>
      <Footer />
    </>
  );
}
