import * as React from "react"
import {
  Button,
  ButtonProps
} from "@chakra-ui/react"

const CButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      color="white"
      bg="blue"
      textTransform="capitalize"
      _hover={{
        opacity: 0.5
      }}
      {...props}
    />
  )
}

export default CButton;
