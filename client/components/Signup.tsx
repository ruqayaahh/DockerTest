import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import {
  EmailIcon,
  ViewOffIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { signup } from "../apis/requests.js";

function Signup() {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const disabled: boolean =
    !userData.firstname ||
    !userData.lastname ||
    !userData.email ||
    !userData.password;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleOnClick = async () => {
    try {
      const result = await signup(userData);
      localStorage.setItem("fname", result.firstname);
      localStorage.setItem("lname", result.lastname);
      navigate(`/dashboard/${result._id}`);
    } catch (error) {
      console.log(error, "error in signup");
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="90vh">
      <Stack spacing={4} align="center" minWidth="30vw">
        <Box boxSize="sm" mb="20px" width="100px" height="100px">
          <Image src="../logo-color.svg" alt="bookit-logo" objectFit="cover" />
        </Box>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<TriangleDownIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="First Name"
            size="md"
            variant="flushed"
            name="firstname"
            value={userData.firstname}
            onChange={(e) => handleOnChange(e)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<TriangleUpIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Last Name"
            size="md"
            variant="flushed"
            name="lastname"
            value={userData.lastname}
            onChange={(e) => handleOnChange(e)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
          <Input
            type="email"
            placeholder="Email"
            size="md"
            variant="flushed"
            name="email"
            value={userData.email}
            onChange={(e) => handleOnChange(e)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<ViewOffIcon color="gray.300" />}
          />
          <Input
            type="password"
            placeholder="Password"
            size="md"
            variant="flushed"
            name="password"
            value={userData.password}
            onChange={(e) => handleOnChange(e)}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          size="md"
          isDisabled={disabled}
          onClick={() => {
            handleOnClick();
          }}
        >
          Signup
        </Button>
      </Stack>
    </Flex>
  );
}

export default Signup;
