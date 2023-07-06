import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'POST') {
        const { title, description, stars, tour } = req.body;
        const createdReview = await Review.create({ title, description, stars, tour });
        res.json(createdReview);
    } else if (req.method === 'GET') {
        const { tour } = req.query;
        const reviews = await Review.find({ tour });
        res.json(reviews);
    }
}
