import { useState } from "react";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import InputForm from "../ui/inputForm/InputForm";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("Email");
  const [userName, setUserName] = useState("User Name");
  const [password, setPassword] = useState("Password");

  const signUpHandler = () => {
    // Handle the sign-up logic here
  };

  return (
    <form className={classes.SignUp}>
      <Label>Sign Up</Label>
      <InputForm value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputForm value={userName} onChange={(e) => setUserName(e.target.value)} />
      <InputForm value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={signUpHandler} variant="default">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;

// import {
//   Anchor,
//   Button,
//   Checkbox,
//   Container,
//   Group,
//   Paper,
//   PasswordInput,
//   Text,
//   TextInput,
//   Title,
// } from '@mantine/core';
// import classes from "./SignUp.module.css";

// const SignUp = () => {
//   return (
//     <Container size={420} my={40}>
//       <Title ta="center" className={classes.title}>
//         Sign Up
//       </Title>
//       <Text c="dimmed" size="sm" ta="center" mt={5}>
//         Existing user?{' '}
//         <Anchor size="sm" component="button">
//           Create account
//         </Anchor>
//       </Text>

//       <Paper withBorder shadow="md" p={30} mt={30} radius="md">
//         <TextInput label="Email" placeholder="you@mantine.dev" required />
//         <PasswordInput label="Password" placeholder="Your password" required mt="md" />
//         <Group justify="space-between" mt="lg">
//           <Checkbox label="Remember me" />
//           <Anchor component="button" size="sm">
//             Forgot password?
//           </Anchor>
//         </Group>
//         <Button fullWidth mt="xl">
//           Sign in
//         </Button>
//       </Paper>
//     </Container>
//   );
// }

// export default SignUp;