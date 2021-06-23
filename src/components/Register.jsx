import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Register({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    switch (e.target.type) {
      case "email":
        setEmail(e.target.value);
        break;
      case "text":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { username, email, password };
      //   * api call with axios
      const response = await axios.post(
        "http://localhost:5000/api/users",
        body
      );
      console.log(response.data);
      // console.log(response.headers["auth-token"]);

      localStorage.setItem("auth-token", response.headers["auth-token"]);
      setIsAuth(true);
      toast.success("Registered successfully");

      // * api call with fetch
      //   const response = await fetch("http://localhost:5000/api/users", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(body),
      //   });

      //   console.log(await response.json());
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  return (
    <Container>
      <H1>Register</H1>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChange}
        />
        <Input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChange}
        />
        <Button>Register</Button>
      </Form>
      <Link to="/login">Already have an account? Login</Link>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const H1 = styled.h1`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 50%;
  margin: 10px;
  border-color: black;
  border-radius: 5px;
  padding: 5px 10px;
`;
const Button = styled.button`
  width: 50%;
  margin: 10px;
  background-color: #00b0ff;
  border: 0;
  border-radius: 5px;
  color: white;
  padding: 10px 0px;
  :hover {
    background-color: black;
    color: white;
  }
`;
