import * as React from "react";
import axios from "axios";
import {
  Select
} from "@chakra-ui/react";


interface CurrencyDropdownProp {
  setSymbol: React.Dispatch<React.SetStateAction<string>>
}

const CurrencyDropdown: React.FC<CurrencyDropdownProp> = ({ setSymbol }) => {
  const [symbols, setSymbols] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!symbols.length) {
      axios.get("/external/symbols")
        .then((res) => {
          return res.data.symbols;
        })
        .then((data) => {
          setSymbols(data);
        })
        .catch((err) => {
          console.error(err);
          alert("Please refresh your browser");
        })
    }
  }, [symbols, setSymbols]);

  return (
    <Select
      borderColor="black"
      onChange={(e) => setSymbol(e.target.value)}
    >
      { symbols.map((symbol) => (
        <option key={symbol} value={symbol}>
          {symbol}
        </option>
      ))}
    </Select>
  );
};

export default CurrencyDropdown