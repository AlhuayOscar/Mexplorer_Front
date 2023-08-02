import styled from "styled-components";
import Center from "@/components/Center";
import BlogGrid from "@/components/BlogGrid";
import ToursGrid from "@/components/ToursGrid";
import { useTranslation } from "react-i18next";

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 20px;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const RedTitle = styled(Title)`
  color: #ee2743;
`;

const PurpleTitle = styled(Title)`
  color: #ac2484;
`;

const YellowTitle = styled(Title)`
  color: #eeb547;
`;

export default function NewTours({ tours, promo }) {
  const { t } = useTranslation();
  return (
    <Center>
      <PurpleTitle>{t("Encuentra tu lugar en cancún")}</PurpleTitle>
      <ToursGrid tours={tours} />
      <RedTitle>{t("No te pierdas estas promos")}</RedTitle>
      <ToursGrid tours={promo} />
      <YellowTitle>{t("Mira estas últimas publicaciónes")}</YellowTitle>
      <BlogGrid />
    </Center>
  );
}
