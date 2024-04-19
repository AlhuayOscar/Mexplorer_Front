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
      const reviewQuantity = await Review.countDocuments({ tour });

      if (averageStars >= 0) {
        await updateTourReview(tour, averageStars, reviewQuantity);
      }

      res.json(createdReview);
    } else if (req.method === "GET") {
      const { tour } = req.query;
      if (tour) {
        // Si se proporciona el parámetro "tour" en la URL, obtener las revisiones asociadas a ese recorrido.
        const reviews = await Review.find({ tour }, null, { sort: { createdAt: -1 } });
        res.json(reviews);
      } else {
        // Si no se proporciona el parámetro "tour" en la URL, obtener todas las revisiones.
        const allReviews = await Review.find({}, null, { sort: { createdAt: -1 } });
        res.json(allReviews);
      }
    } else if (req.method === "DELETE") {
      // Lógica para eliminar una revisión cuando se realiza una solicitud DELETE
      const { id } = req.query;

      // Verificar que el ID proporcionado no sea nulo o vacío
      if (!id) {
        return res.status(400).json({ error: "El ID de la revisión no se proporcionó correctamente." });
      }

      // Eliminar la revisión con el ID proporcionado
      const deletedReview = await Review.findByIdAndDelete(id);

      // Verificar si se encontró y eliminó la revisión
      if (!deletedReview) {
        return res.status(404).json({ error: "La revisión no se encontró o no pudo ser eliminada." });
      }

      // Actualizar la revisión del tour después de eliminar una revisión
      const { tour } = deletedReview;
      const averageStars = await calculateAverageStars(tour);
      const reviewQuantity = await Review.countDocuments({ tour });

      if (averageStars >= 0) {
        await updateTourReview(tour, averageStars, reviewQuantity);
      }

      return res.status(200).json({ message: "Revisión eliminada con éxito." });
    }
  } catch (error) {
    console.error('Error en el handler:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

async function calculateAverageStars(tourId) {
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
    throw 'aqui esta el errorrrrrrrrrr';
  }
}

async function updateTourReview(tourId, averageStars, reviewQuantity) {
  const tour = await Tour.findById(tourId);
  tour.review.total = averageStars;
  tour.review.quantity = reviewQuantity;
  await tour.save();
}
