"use client";
import React, { ReactNode } from "react";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material";

export const Provider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
