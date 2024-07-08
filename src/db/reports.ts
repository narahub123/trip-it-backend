import mongoose from "mongoose";

export const ReportSchema = new mongoose.Schema({
  //   reportId: {
  //     type: String,
  //     required: true,
  //   },
  msgId: { type: String, required: false },
  postId: { type: String, required: false },
  userId: { type: Number, required: true },
  reportedUserId: { type: Number, required: true },
  reportCate: { type: String, required: true },
  reportDetail: { type: String, default: "신고 상세 미제공" },
  reportDate: { type: String, required: true },
  reportFalse: { type: Number, required: true },
});

export const ReportModel = mongoose.model("Report", ReportSchema);
