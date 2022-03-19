import * as React from "react";
import axios from "axios";
import {
  Box,
  HStack,
  Text,
  VStack,
  Circle,
  chakra,
  Select,
  Spinner
} from "@chakra-ui/react";
import {
  ArrowDownIcon
} from "@chakra-ui/icons";

// context
import UserContext from "context/user";
import AppContext from "context/app";

// components
import Title from "components/title";
import CButton from "components/button";
import CInput from "components/input";
import CurrencyDropdown from "components/currency-dropdown";

export const Exchange: React.FC<{}> = () => {
  const { logout } = React.useContext(AppContext);
  const { name } = React.useContext(UserContext);

  const [symbol, setSymbol] = React.useState<string>("AED");
  const [amount, setAmount] = React.useState<number>(0);
  const [converted, setConverted] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleConvert = async () => {
    setIsLoading(true);
    const res = await axios.post("/external/convert", { to: symbol, amount }); 
    setConverted(parseFloat(res.data.result));
    setIsLoading(false);
  }

  return (
    <VStack
      align="flex-start"
      p="20"
      m="20"
    >
      <HStack justify="space-between" w="100%">
        <Title
          title="Exchange"
        />

        <CButton
          children="Logout" 
          onClick={() => {
            if (logout) {
              logout()
            }
          }}
        />
      </HStack>

      <Text>
        My name is <chakra.span textTransform="capitalize">{name}</chakra.span>.
      </Text>
      <Text>
        Please enter your desired currency exchange.
      </Text>

      <HStack align="center">
        <Box flex="1">
          <Select borderColor="black">
            <option value="EUR">EUR</option>
          </Select>
        </Box>
        <Box flex="2">
          <CInput 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </Box>
      </HStack>
      
      <Box>
        <Circle
          size="32px" 
          bg="blue"
          ml="20"  
          my="3"
        >
          <ArrowDownIcon
            fontSize="24px"
            color="white"
          />
        </Circle>
      </Box>

      <HStack align="center">
        <Box flex="1">
          <CurrencyDropdown
            setSymbol={setSymbol}
          />
        </Box>
        <Box flex="2">
          <CInput 
            isDisabled
            _disabled={{
              color: "blue",
              borderColor: "blue"
            }}
            type="number"
            value={converted}
            onChange={(e) => setConverted(parseFloat(e.target.value))}
          />
        </Box>
      </HStack>

      <Box
        h="4" 
      />

      <CButton
        disabled={isLoading}
        children={isLoading ? <Spinner color="white" /> : "convert"}
        onClick={handleConvert}
      />
    </VStack>
  );
};
