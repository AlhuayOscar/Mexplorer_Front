import styled from "styled-components";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const commonStyles = `
  color: #00abbd;
  text-decoration: none;
`;

const getStyledComponent = (component) => styled(component)`
  ${commonStyles}
`;

const StyledWhatsapp = getStyledComponent(WhatsAppIcon);
const StyledTwitter = getStyledComponent(TwitterIcon);
const StyledTelegram = getStyledComponent(TelegramIcon);

const Links = ({ currentUrl }) => {
  return (
    <>
      <Link
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledWhatsapp />
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Echa un vistazo a este tour!")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledTwitter />
          </Link>
          <Link
            href={`https://t.me/share/url?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Echa un vistazo a este tour!")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledTelegram />
          </Link>
    </>
  );
};

export default Links;




