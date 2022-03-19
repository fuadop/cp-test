import * as React from "react";
import {
  Input,
  InputProps,
  VStack,
  Text
} from "@chakra-ui/react";

const CInput: React.FC<InputProps> = (props) => {
  return (
    <VStack align="flex-start">
      { props.placeholder &&
        <Text>
          {props.placeholder}
        </Text>
      }
      <Input 
        {...props} 
        borderColor="black"
        _hover={{
          opacity: 1
        }}
      /> 
    </VStack>
  );
};

export default CInput;
