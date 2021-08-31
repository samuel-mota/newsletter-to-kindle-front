import React, { FormEvent, useState, SyntheticEvent } from "react";

import { useQuery } from "react-query";

import { Container, Form, Input, Button } from "./styles";

interface UserDataProps {
  id: number;
  name: string;
  email: string;
  password: string;
  super: boolean;
}

// interface UserProps {
//   content: Array<UserDataProps>;
// }

export function Login() {
  const { isLoading, error, data } = useQuery("fetchUsers", async () => {
    const response = await fetch("http://localhost:3001/api/user");
    if (response.ok) {
      const resJson = await response.json();
      setUsers(resJson.content);
    }
  });

  const [users, setUsers] = useState<UserDataProps[]>();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    const userFind = users?.find(
      (user) => user.email === email && user.password === pwd
    );

    if (userFind) {
      setUser(userFind);
      setMessage("Logado");
    } else setMessage("Email ou senha inválida");
  }

  return (
    <Container>
      <h1>Kindle</h1>

      <Form onSubmit={(e) => handleLogin(e)}>
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <Button type="submit">Login</Button>
      </Form>

      {message}

      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
    </Container>
  );
}
