import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const BoxNav = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 2px 2px 4px #47556955;
    margin-bottom: 30px;
  }
`;

const ItemsScroll = styled.ul`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ItemScroll = styled.li`
  list-style: none;
  padding: 15px 25px;
  margin: 5px 0;
  font-size: 1.2rem;
  color: #888888;
  ${(props) =>
    props.green &&
    css`
      &:hover {
    color: #84c441;
    border-bottom: 4px solid #84c441;
  }
    `}
  ${(props) =>
    props.red &&
    css`
      &:hover {
    color: #ee2743;
    border-bottom: 4px solid #ee2743;
  }
    `}
  ${(props) =>
    props.purple &&
    css`
      &:hover {
    color: #ac2484;
    border-bottom: 4px solid #ac2484;
  }
    `}
 ${(props) =>
    props.yellow &&
    css`
      &:hover {
    color: #eeb547;
    border-bottom: 4px solid #eeb547;
  }
    `}
    ${(props) =>
    props.blue &&
    css`
      &:hover {
    color: #00abbd;
    border-bottom: 4px solid #00abbd;
  }
    `}
    ${(props) =>
    props.pink &&
    css`
      &:hover {
    color: #e73a78;
    border-bottom: 4px solid #e73a78;
  }
    `}
`;




export default function NavTour({ includesRef, requirementsRef, notesRef, reviewsRef, recomendationsRef }) {
  const { t } = useTranslation();


  const scrollToincludes = () => {
    includesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTorequirements = () => {
    requirementsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTonotes = () => {
    notesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToreviews = () => {
    reviewsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTorecomendations = () => {
    recomendationsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BoxNav>
      <ItemsScroll>
        <ItemScroll onClick={scrollToincludes} yellow>{t("Que incluye")}</ItemScroll>
        <ItemScroll onClick={scrollTorequirements} purple>{t("Que llevar")}</ItemScroll>
        <ItemScroll onClick={scrollTonotes} green>{t("Notas")}</ItemScroll>
        <ItemScroll onClick={scrollToreviews} blue>{t("Reseñas")}</ItemScroll>
        <ItemScroll onClick={scrollTorecomendations} red>{t("Recomendaciones")}</ItemScroll>
      </ItemsScroll>
    </BoxNav>
  );
}