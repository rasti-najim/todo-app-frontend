import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    switch (e.target.type) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await axios.post("http://localhost:5000/api/auth", body);
      // console.log(response.data);

      localStorage.setItem("auth-token", response.data);
      setIsAuth(true);
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  return (
    <Container>
      <H1>Login</H1>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChange}
        />
        <Button>Login</Button>
      </Form>
      <Link to="/register">Register</Link>
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
