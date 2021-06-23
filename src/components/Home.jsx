import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

export default function Home({ setIsAuth }) {
  const [username, setUsername] = useState("");

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      });
      console.log(response.data);
      setUsername(response.data.username);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    setIsAuth(false);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    getUser();
  });
  return (
    <Container>
      <H1>{username}'s Todo List</H1>
      <Button onClick={logout}>Logout</Button>
      <InputTodo />
      <ListTodos />
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

const Button = styled.button`
  width: 25%;
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
