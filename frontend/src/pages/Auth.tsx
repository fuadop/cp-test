import * as React from "react" 
import {
  VStack,
  Text,
  HStack
} from "@chakra-ui/react"

// components
import Title from "components/title";
import CInput from "components/input";
import AuthButton from "components/auth-buttons";

export const Auth: React.FC<{}> = () => {
  const [tab, setTab] = React.useState<"register" | "login">("login");
  const [values, setValues] = React.useState<{ name: string, password: string }>({ name: "", password: "" });
  const [errors, setErrors] = React.useState<{ name: string, password: string }>({ name: "", password: "" });
  const [enable, setEnable] = React.useState<boolean>(false);


  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const validate = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      if (e.target.value.length < 2 && field === "name") {
        setErrors(err => ({ ...err, name: "Name should be at least 2 characters"})); 
        setEnable(false);
        return false;
      }

      if (e.target.value.length < 6 && field === "password") {
        setErrors(err => ({ ...err, password: "Password should at least 6 characters"}));
        setEnable(false);
        return false;
      }

      setErrors(err => ({ ...err, [field]: "" }));
      return true;
    };

    // validate inputs
    if (!validate(e, field)) {
      return;
    }

    setValues(prev => ({ ...prev, [field]: e.target.value }));

    if (values.name.length && values.password.length) {
      setEnable(true);
    }
    // eslint-disable-next-line 
  }, [values, setValues, errors, setErrors]);

  return (
    <VStack 
      p="20"
      m="20"
      align="flex-start"
    >
      <HStack>
        <Text
          as="button" 
          color="blue"
          onClick={() => setTab("register")}
        >
          Register
        </Text>
        <Text>
          |
        </Text>
        <Text
          as="button" 
          color="blue"
          onClick={() => setTab("login")}
        >
          Login
        </Text>
      </HStack> 

      <Title title={tab} />

      <CInput
        placeholder="Enter your name"
        onChange={(e) => handleChange(e, "name")}
      />
      <Text color="red">
        { errors.name.length ? errors.name: ""}
      </Text>

      <CInput
        placeholder="Password"
        type="password"
        onChange={(e) => handleChange(e, "password")}
      />
      <Text color="red">
        { errors.password.length ? errors.password: ""}
      </Text>

      <AuthButton
        tab={tab}
        isDisabled={!enable}
        values={values}
      />
    </VStack>
  );
};
