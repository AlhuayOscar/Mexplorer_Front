import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRanting from "./StarsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";

const Title = styled.h2`
font-size:1.2rem;
margin-bottom: 5px;
`;

const Subtitle = styled.h3`
font-size: 1rem;
margin-top: 5px;
`;

const ColsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px;
`

export default function ToursReviews({ tour }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState(0);
    const [reviews, setReviews] = useState([]);

    function submitReview() {
        const data = { title, description, stars, tour: tour._id }
        axios.post('/api/reviews', data).then(res => {
            setTitle('');
            setDescription('');
            setStars(0);
            alert('ok');
        });
    }

    useEffect(() => {
        axios.get('/api/reviews?tour=' + tour._id).then(res => {
            setReviews(res.data);
        });
    }, []);
    return (
        <div>
            <Title>Reseña</Title>
            <ColsWrapper>
                <WhiteBox>
                    <Subtitle>Agrega una reseña</Subtitle>
                    <div>
                        <StarsRanting onChange={setStars} />
                    </div>
                    <Input
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                        placeholder="Titulo" />
                    <Textarea
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                        placeholder="Deja tu opinión" />
                    <div>
                        <Button onClick={submitReview} >Enviar</Button>
                    </div>
                </WhiteBox>
                <WhiteBox>
                    <Subtitle>Reseña</Subtitle>
                    {reviews.length === 0 ? (
                        <p>No tiene reseña</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review.id}>
                                <StarsRanting size={'sm'} disabled={true} defaulHowMany={review.stars} />
                                <time>{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                                {review.title}
                                {review.description}
                            </div>
                        ))
                    )}
                </WhiteBox>
            </ColsWrapper>
        </div>
    );
}