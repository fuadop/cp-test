import { ButtonProps, Spinner } from "@chakra-ui/react";
import axios from "axios";
import * as React from "react"

// context
import AppContext from "../../context/app";

// components
import CButton from "../button"

interface ClickMap {
  login: React.MouseEventHandler<HTMLButtonElement>,
  register: React.MouseEventHandler<HTMLButtonElement>
}

interface AuthButtonProps {
  tab: "register" | "login"
  values: { name: string, password: string}
}

const AuthButton: React.FC<AuthButtonProps & ButtonProps> = ({ tab, values, ...props }) => {
  const { login } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // perform various onclick actions based on the tab
  const clickMap: ClickMap = {
    login: async () => {
      setIsLoading(true);
      // make api call
      try {
        let res: any = await axios.post("/auth/login", values);
        if (res.data) {
          res = res.data
        }
        // set session storage
        if (login) {
          login(res.token, res.user.name);
        }
      } catch (e: any) {
        alert(e?.response?.data?.message);
      }
      setIsLoading(false);
    },
    register: async () => {
      setIsLoading(true);
      try {
        let res: any = await axios.post("/auth/register", values);
        if (res.data) {
          res = res.data
        }
        // set session storage
        if (login) {
          login(res.token, res.user.name);
        }
      } catch (e: any) {
        alert(e?.response?.data?.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <CButton
      {...props}
      children={isLoading ? <Spinner color="white"/> :tab}
      onClick={clickMap[tab]}
    />
  );
};

export default AuthButton;
