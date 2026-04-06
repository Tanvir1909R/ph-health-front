import { authKey } from "@/constant";
import { removeUser } from "../auth.service";
import { deleteCookies } from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = (router:AppRouterInstance) => {
  removeUser();
  deleteCookies([authKey, "PHrefreshToken"]);
  router.push("/");
  router.refresh();
};
