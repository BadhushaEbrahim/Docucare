import { useNavigate, Link } from "react-router-dom";
import { userSignUpSchema } from "../../../schemas";
import { useFormik } from "formik";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { useToaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { User_Register } from "../../../utils/ConstUrls";
import "./errorStyle.css"

const Register = () => {
  const navigate = useNavigate();


  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    await axios
      .post(User_Register, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.MailSend) {  
  
        toast.success(response.data.message)
         
        setTimeout(() => {
          navigate("/user-login");
        }, 1000);
        } else {
          console.log(data);
          console.log(response.data.message)
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
        if (err.response.status===500) {
          navigate('/error')
        }
      });
    actions.resetForm();
  };
  

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        date: "",
        number: "",
      },
      validationSchema: userSignUpSchema,
      onSubmit,
    }); 

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1831.jpg?size=626&ext=jpg&ga=GA1.1.1128364979.1680491256&semt=ais"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Register a new account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mt={6}>
              <FormLabel>Username</FormLabel>
              <Input
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                id="userName"
                type="text"
                placeholder="Enter your username"
              />
              {errors.userName && touched.userName && (
                <p className="error">{errors.userName}</p>
              )}
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Email address</FormLabel>
              <Input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Date of birth</FormLabel>
              <Input
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                id="date"
                type="date"
                placeholder="Enter your Date of Birth"
              />
              {errors.dob && touched.dob && (
                <p className="error">{errors.dob}</p>
              )}
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Contact Number</FormLabel>
              <Input
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                id="number"
                type="number"
                placeholder="Enter your Number"
              />
              {errors.number && touched.number && (
                <p className="error">{errors.number}</p>
              )}
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
            </FormControl>

            <Stack spacing={6} mt={2}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text color={"blue.500"}>
                  Already have an account? <Link to="/user-login">Log in</Link>
                </Text>
              </Stack>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                type="submit"
                bg={"blue.500"}
              >
                SIGN IN
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Toaster />
    </Stack>
  );
};

export default Register;
