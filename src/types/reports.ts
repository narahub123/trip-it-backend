export interface ReportType {
  userId: number;
  reportedUserId: number;
  reportCate: string;
  reportDetail: string;
  reportDate: string;
  reportFalse: number;
  msgId?: string;
  postId?: string;
  _id: string;
}
