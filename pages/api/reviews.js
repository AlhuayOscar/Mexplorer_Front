import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";
import { Tour } from "@/models/Tour";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    await mongooseConnect();

    if (req.method === "POST") {
      const { title, description, stars, tour } = req.body;
      const createdReview = await Review.create({ title, description, stars, tour });

      const averageStars = await calculateAverageStars(tour);

      if (averageStars >= 0) {
        await updateTourReview(tour, averageStars);
      }

      res.json(createdReview);
    } else if (req.method === "GET") {
      const { tour } = req.query;
      const reviews = await Review.find({ tour }, null, { sort: { createdAt: -1 } });
      //console.log(reviews);
      res.json(reviews);
    }
  } catch (error) {
    console.error('Error en el handler:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

async function calculateAverageStars(tourId) {
    console.log('Entrando a calculateAverageStars con tourId:', tourId);
    try {
      const tourObjectId = new mongoose.Types.ObjectId(tourId); 
  
      const averageStars = await Review.aggregate([
        { $match: { tour: tourObjectId } }, 
        { $group: { _id: null, averageStars: { $avg: '$stars' } } }, 
      ]);
  
      if (averageStars.length === 0) {
        return 5;
      }

      return Math.ceil(averageStars[0].averageStars);
    } catch (error) {
      throw error; 
    }
  }

async function updateTourReview(tourId, averageStars) {
  console.log('Actualizando review del tourId', tourId, 'con promedio de estrellas:', averageStars);
  const tour = await Tour.findById(tourId);
  tour.review = averageStars;
  await tour.save();
}
