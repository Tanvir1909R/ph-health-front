"use server";

import { authKey } from "@/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = (token: string, option?: any) => {
  cookies().set(authKey, token);
  //    if (option && option.passwordChangeRequired) {
  //       redirect('/dashboard/change-password');
  //    }
  if (option && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
