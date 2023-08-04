import styled from "styled-components";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  display: flex;
  align-items: center;

  p{
    font-size: 1.6rem;
    font-weight: bold;
    color: #84c441;
  }

  div{
    display: flex;
    gap: 15px;
  }
  `;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-inline: 5px;
`;

const LinkStyled = styled(Link)`
  display: flex;
  place-items: center;
  background-color: #84c441;
  padding: 10px;
  border-radius: 50%;
  &:hover {
    background-color: #699c34;
    scale: 1.02;
    transition: 0.5s ease-in-out;
  }
`;
const FollowUs = ({ socialUrls }) => {

  return (
    <CenteredContainer>
      <p>Síguenos:</p>
      <div>
        <LinkStyled href={'https://mexplorer-front-three.vercel.app/'}>
          <Icon
            src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1689651875/facy_toglrc.png"
            alt="Facebook"
          />
        </LinkStyled>
        <LinkStyled href={'https://mexplorer-front-three.vercel.app/'}>
          <Icon
            src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1689651875/insy_lcdcik.png"
            alt="Instagram"
          />
        </LinkStyled>
        <LinkStyled href={'https://mexplorer-front-three.vercel.app/'}>
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
