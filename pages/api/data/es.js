import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  const { _id } = req.query;
  try {
    if (method === "GET") {
      if (_id) {
        const tour = await Tour.findOne({ _id }).select(
          "name subtitle description includes requirements doesntIncludes notes"
        );
        return res.status(200).json(tour);
      } else {
        const tours = await Tour.find({}).select(
          "name subtitle description includes requirements doesntIncludes notes"
        );
        return res.status(200).json(tours);
      }
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}
