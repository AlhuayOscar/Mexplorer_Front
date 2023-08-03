import { Blog } from "@/models/Blog";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  const { _id } = req.query;
  
  try {
    if (method === "GET") {
      if (_id) {
        const blog = await Blog.findOne({ _id }).select(
          "title subtitle description"
        );
        return res.status(200).json(blog);
      } else {
        const blogs = await Blog.find({}).select(
            "title subtitle description"
        );
        return res.status(200).json(blogs);
      }
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}