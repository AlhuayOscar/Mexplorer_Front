import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error al obtener los blogs:", error);
    res.status(500).json({ error: "Error al obtener los blogs" });
  }
}
