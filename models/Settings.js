import { model, models, Schema } from "mongoose";

const SettingsSchema = new Schema({
  videoUrls: { type: [String] },
  urlName: { type: [String] },
});

export const Settings = models?.Settings || model("Settings", SettingsSchema);
