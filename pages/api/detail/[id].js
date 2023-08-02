import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  try {
    await mongooseConnect(); 
    const { id } = req.query;
    const tour = await Tour.findById(id);
    
    if (!tour) {
      return res.status(404).json({ error: "Tour no encontrado" });
    }
    
    res.json(tour);
  } catch (error) {
    console.error("Error al obtener el tour:", error);
    res.status(500).json({ error: "Error al obtener el tour" });
  }
}