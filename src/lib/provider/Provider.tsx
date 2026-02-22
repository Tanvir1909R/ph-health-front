"use client";
import React, { ReactNode } from "react";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material";
import {Provider} from "react-redux"
import { store } from "@/redux/store";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>;
};
