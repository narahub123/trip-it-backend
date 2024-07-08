import mongoose from "mongoose";

export const ScheduleSchema = new mongoose.Schema({
  schedule_id: { type: String, required: false },
  metro_id: { type: Number, required: true },
  user_id: { type: String, required: false },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  createdAt: { type: Date, required: false },
  schedule_title: { type: String, required: true },
  schedule_details: [
    {
      schedule_order: { type: Number, required: false },
      start_time: { type: Date, required: false },
      end_time: { type: Date, requierd: false },
      content_id: { type: String, required: false },
      createdAt: { type: Date, required: false },
    },
  ],
});

export const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);
