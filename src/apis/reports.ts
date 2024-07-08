import { ReportModel } from "../db/reports";

// 신고 등록하기
export const createReportByValue = async (value: Record<string, any>) => {
  console.log(value);

  const report = new ReportModel(value);

  const savedReport = await report.save();

  if (savedReport) {
    return { status: "succeed" };
  } else {
    return { status: "rejected" };
  }
};

// 자신의 신고 목록
export const getReportsById = (userId: number) => {
  return ReportModel.find({ userId });
};

// 신고 목록 전체
export const getAllReports = () => {
  return ReportModel.find();
};

// 신고 목록 전체
export const getAdminAllReports = (queryObject: any) => {
  console.log(queryObject);

  return ReportModel.find(queryObject);
};

// 업데이트 신고 처리
export const updateReportById = (id: string, reportFalse: number) => {
  try {
    const updateReport = ReportModel.findByIdAndUpdate(
      id,
      { reportFalse },
      { new: true }
    );

    if (!updateReport) {
      throw new Error(`아이디를 찾을 수 없습니다.`);
    }

    return updateReport;
  } catch (error) {
    console.log(error);
  }
};
