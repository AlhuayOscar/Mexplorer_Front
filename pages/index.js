import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";
import NewTours from "@/components/NewTours";
import Spinner from "react-spinner";
import LoadingComponent from "@/components/LoadingComponent";

const slideDownAnimation = keyframes`
  0% {
    opacity:0.9;
    transform: translateY(0%);
  }
  100% {
        opacity:1;
    transform: translateY(0);
  }
`;

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 120px;
  z-index: 25;
`;

const AnimatedHeaderWrapper = styled.div`
  position: relative;
  animation: ${slideDownAnimation} 5.5s ease;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  z-index: 30;
  animation: ${(props) =>
      props.loading ? slideDownAnimation : fadeOutAnimation}
    0.5s linear;
  animation-fill-mode: forwards;
  opacity: ${(props) => (props.loading ? 1 : 0)};
`;

export default function HomePage({ featuredTour, newTours, promoTours }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <LoadingContainer loading={loading}>
        <LoadingComponent />
      </LoadingContainer>
      <AnimatedHeaderWrapper>
        <Header />
      </AnimatedHeaderWrapper>
      <Featured tour={featuredTour} />
      <NewTours tours={newTours} promo={promoTours} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredTourId = "640de2b12aa291ebdf213d48";
  await mongooseConnect();
  const featuredTour = await Tour.findById(featuredTourId);
  const newTours = await Tour.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const promoTours = await Tour.find({ promo: true }, null);
  return {
    props: {
      featuredTour: JSON.parse(JSON.stringify(featuredTour)),
      newTours: JSON.parse(JSON.stringify(newTours)),
      promoTours: JSON.parse(JSON.stringify(promoTours)),
    },
  };
}
