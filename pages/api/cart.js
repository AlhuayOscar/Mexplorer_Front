import {mongooseConnect} from "@/lib/mongoose";
import {Tour} from "@/models/Tour";

export default async function handle(req,res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Tour.find({_id:ids}));
}