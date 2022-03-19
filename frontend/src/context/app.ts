import React, { createContext } from "react";

interface App {
  page: string,
  setPage?: React.Dispatch<React.SetStateAction<"auth" | "exchange">>
  logout?: () => void
  login?: (...args: string[]) => void
};

export default createContext<App>({ page: "auth" });
