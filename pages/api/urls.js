import { mongooseConnect } from "@/lib/mongoose";
import { Settings } from "@/models/Settings";

export default async function handle(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    await mongooseConnect(); // Conecta con la base de datos (usando la función que hayas definido)

    // Busca los documentos donde "urlName" sea igual a "Portada"
    const portadaUrls = await Settings.find({ urlName: "Portada" });

    if (!portadaUrls || portadaUrls.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron URLs de portada" });
    }

    // Devuelve las URLs de "Portada"
    res.status(200).json(portadaUrls);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
}
