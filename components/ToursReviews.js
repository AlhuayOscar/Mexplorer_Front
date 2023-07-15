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
grid-template-columns: 1fr;
gap: 20px;
@media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}
`;

const ReviewWrapper = styled.div`
margin-bottom: 10px;
border-top: 1px solid #ccc;
padding: 10px 0;

h3{
    margin:10px;
    font-size:1rem;
    color: #444;
}
p{
    margin:0;
    color: #555;
}
`;

const ReviewHeader = styled.div`
display: flex;
justify-content: space-between;
time{
    font-size: 14px;
    color: #aaa;
}
`;

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
            loadReviews();
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
    return (
        <div>
            <ColsWrapper>
                <div>
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
                </div>
                <div>
                    <WhiteBox>
                        <Subtitle>Reseña</Subtitle>
                        {reviews.length === 0 ? (
                            <p>No tiene reseña</p>
                        ) : (
                            reviews.map(review => (
                                <ReviewWrapper key={review.id}>
                                    <ReviewHeader>
                                        <StarsRanting size={'sm'} disabled={true} defaulHowMany={review.stars} />
                                        <time>{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                                    </ReviewHeader>
                                    <h3>{review.title}</h3>
                                    <p>{review.description}</p>
                                </ReviewWrapper>
                            ))
                        )}
                    </WhiteBox>
                </div>
            </ColsWrapper>
        </div>
    );
}