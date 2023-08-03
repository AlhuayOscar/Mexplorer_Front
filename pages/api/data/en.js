import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  const { _id } = req.query;

  if (method === "GET") {
    if (_id) {
      const tour = await Tour.findOne({ _id }).select(
        "nameEng subtitleEng descriptionEng includesEng requirementsEng doesntIncludesEng notesEng"
      );
      return res.status(200).json(tour);
    } else {
      const tours = await Tour.find({}).select(
        "nameEng subtitleEng descriptionEng includesEng requirementsEng doesntIncludesEng notesEng"
      );
      return res.status(200).json(tours);
    }
  }
}
