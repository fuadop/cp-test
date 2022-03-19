import * as React from "react";
import {
  Text
} from "@chakra-ui/react";

const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Text
      as="h1"
      textTransform="capitalize"
      fontWeight="bold"
      fontSize="1.5rem" 
    >
      { title }
    </Text>
  );
}

export default Title;
