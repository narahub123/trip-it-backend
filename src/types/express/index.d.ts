import { User } from "../../db/user";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
