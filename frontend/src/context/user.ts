import { createContext } from "react";

interface User {
  name: string,
};

export default createContext<User>({ name: "" });
