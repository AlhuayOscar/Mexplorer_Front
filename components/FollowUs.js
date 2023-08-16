import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  display: flex;
  align-items: center;

  p {
    font-size: 1.6rem;
    font-weight: bold;
    color: #84c441;
  }

  div {
    display: flex;
    gap: 15px;
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-inline: 5px;
`;

const LinkStyled = styled.a`
  display: flex;
  place-items: center;
  background-color: #84c441;
  padding: 10px;
  border-radius: 25%;
  text-decoration: none;
  color: inherit;
  &:hover {
    background-color: #699c34;
    scale: 1.02;
    transition: 0.5s ease-in-out;
  }
`;

const FollowUs = () => {
  const { t } = useTranslation();
  const [socialUrls, setSocialUrls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/urls")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          console.error("No se encontraron URLs de Portada.");
          setLoading(false);
          return;
        }

        // Get the index of the target URLs in the data array
        const whatsappIndex = data[0].urlName.findIndex(
          (item) => item === "Whatsapp"
        );
        const facebookIndex = data[0].urlName.findIndex(
          (item) => item === "Facebook"
        );
        const instagramIndex = data[0].urlName.findIndex(
          (item) => item === "Instagram"
        );
        const tripadvisorIndex = data[0].urlName.findIndex(
          (item) => item === "Trip"
        );

        setSocialUrls({
          whatsapp:
            whatsappIndex !== -1 ? data[0].videoUrls[whatsappIndex] : "",
          facebook:
            facebookIndex !== -1 ? data[0].videoUrls[facebookIndex] : "",
          instagram:
            instagramIndex !== -1 ? data[0].videoUrls[instagramIndex] : "",
          tripadvisor:
            tripadvisorIndex !== -1 ? data[0].videoUrls[tripadvisorIndex] : "",
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las URLs de Portada:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CenteredContainer>
      <p>{t("Síguenos")}:</p>
      <div>
        <LinkStyled href={socialUrls.facebook}>
          <Icon
            src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1689651875/facy_toglrc.png"
            alt="Facebook"
          />
        </LinkStyled>
        <LinkStyled href={socialUrls.instagram}>
          <Icon
            src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1689651875/insy_lcdcik.png"
            alt="Instagram"
          />
        </LinkStyled>
        <LinkStyled href={socialUrls.tripadvisor}>
          <Icon
            src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1689651875/trippy_gpvp7q.png"
            alt="TripAdvisor"
          />
        </LinkStyled>
      </div>
    </CenteredContainer>
  );
};

export default FollowUs;
