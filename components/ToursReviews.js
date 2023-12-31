import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRanting from "./StarsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";


const Subtitle = styled.h3`
font-size: 1.2rem;
margin: 0;
margin-bottom: 20px;
color: #84C441;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ColsWrapper = styled.div`
margin: 30px 0;
display: grid;
grid-template-columns: 1fr;
gap: 20px;
@media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    /* gap: 40px; */
   
}
`;

const ReviewWrapper = styled.div`
/* border-radius: 10px; */
margin-bottom: 10px;
/* border: 1px solid #ccc; */
border-bottom: 1px solid #ccc;
padding: 15px;


h3{
    margin: 5px 0;
    font-size:1rem;
    color: #444;
    font-size: 1.1rem;
}
p{
    margin: 5px 0;
    color: #555;
    font-size: 0.9rem;
}
`;

const ReviewHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
time{
    font-size: 14px;
    color: #aaa;
}

`;

const ButtonRev = styled(Button)`
  width: 5rem;
  &:hover {
    scale: 1.02;
    background-color: #699c34;
  }
`;
const ButtonC = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  padding: 0;
  margin: 5px;
  color: #888888;
  &:hover {
    border-bottom: 1px solid #699c34;
    color: #699c34;
  }
`;

const WhiteBoxC = styled.div`
  max-height: 540px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 768px) {
    max-height: 470px;
}
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3{
      margin: 0;
    }
  }
  h2{
    font-size: 3.6rem;
    color: #84C441;
    margin: 5px;
    font-weight: 400;
  }
  span{
    font-size: 1rem;
    color: #84C441;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const White = styled(WhiteBox)`
  height: fit-content;
  padding: 20px 30px;
  @media screen and (min-width: 768px) {
  height: 536px;
}
`;

export default function ToursReviews({ tour }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedComments, setExpandedComments] = useState([]);




  const limitedReviews = reviews.slice(0, 3);

  function submitReview() {
    const data = { title, description, stars, tour: tour._id }
    axios.post('/api/reviews', data)
      .then(() => {
        setTitle('');
        setDescription('');
        setStars(0);
        loadReviews();

        // Alert
        Swal.fire({
          icon: "success",
          title: t("¡Reseña añadida exitosamente!"),
          timer: 1600,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .catch(error => {
        console.error("Error submitting review:", error);
      });

  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    axios.get('/api/reviews?tour=' + tour._id).then(res => {
      setReviews(res.data);
    });
  }

  const handleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const handleToggleDescription = (commentId) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };
  return (

    <ColsWrapper>
      <InfoBox>
        <ReviewBox>
          <div>
            <Subtitle>{tour.name}</Subtitle>
            <StarsRanting size={'sm'} disabled={true} defaulHowMany={tour.review.total} />
          </div>
          <h2>{tour.review.total} / 5</h2>
          <span>{tour.review.quantity} {t("Reseñas")}</span>
        </ReviewBox>

        <Box>
          <Subtitle>{t("Agrega una reseña")}</Subtitle>

          <StarsRanting onChange={setStars} />

          <Input
            margin
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            placeholder={t("Titulo")} />
          <Textarea
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            placeholder={t("Deja tu opinión")} />

          <ButtonRev green block onClick={submitReview} >{t("Enviar")}</ButtonRev>

        </Box>
      </InfoBox>

      <White>
        <Subtitle>{t("Reseñas")}</Subtitle>
        <WhiteBoxC>
          {reviews.length === 0 ? (
            <p>{t("No tiene reseña")}</p>
          ) : (
            <>
              {limitedReviews.map(review => (
                <ReviewWrapper key={review.id}>
                  <ReviewHeader>
                    <h3>{review.title}</h3>
                    <time>{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                  </ReviewHeader>
                  <StarsRanting size={'sm'} disabled={true} defaulHowMany={review.stars} />
                  <div>
                    {expandedComments.includes(review._id)
                      ? <p>{review.description}</p>
                      : review.description.length <= 160
                        ? <p>{review.description}</p>
                        : <p>{review.description.substring(0, 160)}</p>}
                    {review.description.length > 160 && (
                      <ButtonC onClick={() => handleToggleDescription(review._id)}>
                        {expandedComments.includes(review._id) ? t("Mostrar menos") : t("Mostrar más")}
                      </ButtonC>
                    )}
                  </div>

                </ReviewWrapper>
              ))}

              {showAllReviews && (
                reviews.slice(3).map(review => (
                  <ReviewWrapper key={review.id}>
                    <ReviewHeader>
                      <h3>{review.title}</h3>
                      <time>{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                    </ReviewHeader>
                    <StarsRanting size={'sm'} disabled={true} defaulHowMany={review.stars} />
                    <div>
                      {expandedComments.includes(review.id)
                        ? <p>{review.description}</p>
                        : review.description.length <= 160
                          ? <p>{review.description}</p>
                          : <p>{review.description.substring(0, 160)}</p>}
                      {review.description.length > 160 && (
                        <ButtonC onClick={() => handleToggleDescription(review.id)}>
                          {expandedComments.includes(review.id) ? t("Mostrar menos") : t("Mostrar más")}
                        </ButtonC>
                      )}
                    </div>
                  </ReviewWrapper>
                ))
              )}
            </>
          )}

        </WhiteBoxC>
        {reviews.length > 3 && (
          <ButtonC onClick={handleShowAllReviews}>{!showAllReviews ? t("Más comentarios") : t("Menos comentarios")}</ButtonC>
        )}
      </White>

    </ColsWrapper>

  );
}