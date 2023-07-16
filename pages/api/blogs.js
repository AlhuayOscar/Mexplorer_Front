import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  await mongooseConnect();
  const blogs = await Blog.find();
  res.json(blogs);
}
