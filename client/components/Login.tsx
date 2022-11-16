import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, ViewOffIcon } from "@chakra-ui/icons";
import { login } from "../apis/requests.js";
// import logo from "./logo-color.svg";

function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const disabled: boolean = !userData.email || !userData.password;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleOnClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const result = await login(userData);
      localStorage.setItem("fname", result.firstname);
      localStorage.setItem("lname", result.lastname);
      navigate(`/dashboard/${result._id}`);
    } catch (error) {
      console.log(error, "error in login");
    }
  };
  return (
    <Flex alignItems="center" justifyContent="center" height="90vh">
      <Stack spacing={4} align="center" minWidth="30vw">
        <Box boxSize="sm" mb="20px" width="100px" height="100px">
          <Image src="./logo-color.svg" alt="bookit-logo" objectFit="cover" />
        </Box>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
          <Input
            borderColor="teal"
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
            borderColor="teal"
            type="password"
            placeholder="Password"
            size="md"
            variant="flushed"
            name="password"
            value={userData.password}
            onChange={(e) => handleOnChange(e)}
          />
        </InputGroup>
        <div>
          New User?{" "}
          <Link to="/signup">
            <Text display="inline" color="teal">
              Signup
            </Text>
          </Link>
        </div>
        <Button
          colorScheme="teal"
          isDisabled={disabled}
          size="md"
          onClick={(e) => {
            handleOnClick(e);
          }}
        >
          Login
        </Button>
      </Stack>
    </Flex>
  );
}

export default Login;
