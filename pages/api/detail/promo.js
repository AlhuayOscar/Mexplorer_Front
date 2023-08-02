import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  try {
    await mongooseConnect(); 
    const promoTours = await Tour.find({ promo: true }, null, { limit: 3 });
    
    if (!promoTours) {
      return res.status(404).json({ error: "Tour no encontrado" });
    }
    
    res.json(promoTours);
  } catch (error) {
    console.error("Error al obtener el tour:", error);
    res.status(500).json({ error: "Error al obtener el tour" });
  }
}